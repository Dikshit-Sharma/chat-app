import React, { useState } from "react";

const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
  "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "☺️", "🙂",
  "🤗", "🤩", "😏", "😴", "😺", "😻", "😼", "😽", "🙀", "😿",
  "😾", "👋", "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "👏",
  "🙌", "👋", "🤝", "🙏", "💪", "👊", "✊", "🤛", "🤜", "🤚",
  "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐️", "🖖", "👌",
  "🤏", "✍️", "👂", "👃", "🧠", "🦾", "🦿", "🦶", "👄", "👅",
  "👂", "👃", "👁️", "👀", "🧠", "🦷", "🦴", "👍", "👎", "👊",
  "✊", "🤛", "🤜", "👏", "🙌", "👋", "👇", "👈", "👉", "👆",
  "🙏", "✍️", "💪", "🦾", "🦿", "🦵", "🦶", "👣", "👂", "👃",
  "🧠", "🦷", "🦴", "👍", "👎", "👊", "✊", "🤛", "🤜", "👏",
  "🙌", "👋", "👆", "👇", "👈", "👉", "🙏", "👍", "👎", "👊",
  "✊", "🤛", "🤜", "👏", "🙌", "👋", "👆", "👇", "👈", "👉",
  "🙏", "👍", "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👋",
  "👆", "👇", "👈", "👉", "🙏", "👍", "👎", "👊", "✊", "🤛",
  "🤜", "👏", "🙌", "👋", "👆", "👇", "👈", "👉", "🙏", "👍",
  "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👋", "👆", "👇",
  "👈", "👉", "🙏", "👍", "👎", "👊", "✊", "🤛", "🤜", "👏",
  "🙌", "👋", "👆", "👇", "👈", "👉", "🙏", "👍", "👎", "👊",
  "✊", "🤛", "🤜", "👏", "🙌", "👋", "👆", "👇", "👈", "👉",
  "🙏", "👍", "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👋",
  "👆", "👇", "👈", "👉", "🙏", "👍", "👎", "👊", "✊", "🤛",
  "🤜", "👏", "🙌", "👋", "👆", "👇", "👈", "👉", "🙏", "👍",
  "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👋", "👆", "👇",
  "👈", "👉", "🙏", "👍", "👎", "👊", "✊", "🤛", "🤜", "👏",
  "🙌", "👋", "👆", "👇", "👈", "👉", "🙏", "👍", "👎", "👊",
  "✊", "🤛", "🤜", "👏", "🙌", "👋", "👆", "👇", "👈", "👉",
  "🙏"
];

const EmojiPicker = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emoji) => {
    onSelect(emoji);
    togglePicker();
  };

  return (
    <div className="emoji-picker-container">
      <button className="emoji-picker-button" onClick={togglePicker}>
        😊
      </button>
      {showPicker && (
        <div className="emoji-picker">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              className="emoji"
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
