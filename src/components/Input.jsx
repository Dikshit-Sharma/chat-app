import React, { useContext, useState, useRef } from "react";
import Attach from "../img/attach.png";
import EmojiPicker from "./EmojiPicker"; // Import EmojiPicker component
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State to store file preview URL
  const [fileName, setFileName] = useState(""); // State to store file name
  const [emoji, setEmoji] = useState(""); // State to store selected emoji
  const inputRef = useRef(null); // Reference to the input element

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Check if the selected file is an image
    if (selectedFile.type.startsWith("image")) {
      setFilePreview(URL.createObjectURL(selectedFile)); // Create temporary URL for image preview
    } else {
      setFileName(selectedFile.name); // Display the file name for non-image files
    }
  };

  const handleSend = async () => {
    let messageText = text.trim(); // Trim whitespace from the message text
    if (messageText === "" && !file && emoji === "") {
      // Don't send empty messages
      return;
    }

    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: messageText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            file: { name: file.name, url: downloadURL },
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text: messageText,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text: messageText,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setFile(null);
        setFilePreview(null); // Reset file preview after sending
        setFileName(""); // Reset file name after sending
      } catch (error) {
        console.error("Error sending file:", error);
        // Handle error sending file
      }
    } else {
      // Sending text message without file
      if (!messageText.endsWith(emoji)) {
        // Append the selected emoji to the message text if it's not already included
        messageText += emoji;
      }

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: messageText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: messageText,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: messageText,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
    }
    setEmoji(""); // Reset selected emoji after sending
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior (form submission)
      handleSend(); // Call handleSend function when Enter key is pressed
    }
  };

  // Function to handle closing the file preview
  const handleClose = () => {
    setFile(null); // Clear the selected file
    setFilePreview(null); // Clear the file preview
    setFileName(""); // Clear the file name
  };

  // Function to handle emoji selection
  const handleEmojiSelect = (selectedEmoji) => {
    // Append the selected emoji to the current text value
    setText(text + selectedEmoji);

    // Set the selected emoji as the new emoji state
    setEmoji(selectedEmoji);

    // Focus on the input after selecting an emoji
    inputRef.current.focus();
  };

  // Function to handle input change
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={text}
        ref={inputRef}
      />
      <EmojiPicker onSelect={handleEmojiSelect} />{" "}
      {/* Render EmojiPicker component */}
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
      {(filePreview || fileName) && (
        <div className="preview-overlay" onClick={handleClose}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            {filePreview && <img src={filePreview} alt="Popup Preview" />}
            {fileName && <p>{fileName}</p>}
            <div className="preview-buttons">
              <button onClick={handleSend}>{file ? "Send" : "Cancel"}</button>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
