import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import Search from "./Search";

const GroupChatPopup = ({ onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleAddUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
  };

  const handleCreateGroupChat = async () => {
    const chatRef = await addDoc(collection(db, "chats"), {
      messages: [],
      type: "group",
      createdAt: serverTimestamp(),
      groupName: groupName,
    });

    const chatId = chatRef.id;

    // Upload avatar image if selected
    let avatarURL = null;
    if (avatar) {
      const avatarRef = storage.ref().child(`avatars/${chatId}`);
      await avatarRef.put(avatar);
      avatarURL = await avatarRef.getDownloadURL();
    }

    // Update userChats for each selected user
    selectedUsers.forEach(async (user) => {
      await updateDoc(doc(db, "userChats", user.uid), {
        [chatId]: {
          type: "group",
          date: serverTimestamp(),
        },
      });
    });

    // Update userChats for the current user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId]: {
        type: "group",
        date: serverTimestamp(),
      },
    });

    // Close the popup window
    onClose();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="group-chat-popup">
      <div className="modal">
        <div className="modal-content">
          <h2>Create Group Chat</h2>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <label htmlFor="avatar">Select Avatar:</label>
          <input type="file" id="avatar" onChange={handleAvatarChange} />
          <Search onUserSelect={handleAddUser} />
          <div className="selected-users">
            {selectedUsers.map((user) => (
              <div key={user.uid}>{user.displayName}</div>
            ))}
          </div>
          <button onClick={handleCreateGroupChat}>Create Group Chat</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatPopup;
