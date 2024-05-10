import React, { useContext, useState } from 'react';
import Cam from "../img/cam.png";
import Call from "../img/call.png";
import addAvatar from "../img/addAvatar.png";
import Messages from "./Messages"
import Input from "./Input"
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(prevState => !prevState); // Toggle the showProfile state
  };

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Call} alt="" />
          <img src={addAvatar} alt="" onClick={toggleProfile} /> {/* Add onClick event */}
          {/* Dropdown button for settings and profile */}
          {showProfile && (
            <div className="profilePopup">
              <button className="closeButton" onClick={toggleProfile}>X</button> {/* Close button */}
              <img src={data.user?.photoURL} alt="Profile" className="profileImage" />
              <div className="userInfo">
                <div className="userName">
                  <p>User: {data.user?.displayName}</p>
                  </div>
                {/* Additional profile details can be added here */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
