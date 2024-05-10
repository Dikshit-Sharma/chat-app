import React from 'react';

const UserItem = ({ user, onSelect, isSelected }) => {
  return (
    <div className="user-item">
      <input type="checkbox" checked={isSelected} onChange={() => onSelect(user)} />
      <span>{user.displayName}</span>
    </div>
  );
}

export default UserItem;
