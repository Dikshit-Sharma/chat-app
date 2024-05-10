import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formattedTime = message.date.toDate().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isImage = (file) => file && file.type && file.type.startsWith("image");

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>{formattedTime}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.file && (
          isImage(message.file) ? (
            <img src={message.file} alt={message.file.name} className="image-file" />
          ) : (
            <a href={message.file.url} target="_blank" rel="noopener noreferrer" className="file-download">
              {message.file.name}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default Message;
