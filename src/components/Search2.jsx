import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search2 = ({ onUserSelect }) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      const foundUsers = [];
      querySnapshot.forEach((doc) => {
        foundUsers.push(doc.data());
      });
      setUsers(foundUsers);
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Find a user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="search-results">
        {users.map((user) => (
          <div key={user.uid} onClick={() => onUserSelect(user)}>
            {user.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search2;
