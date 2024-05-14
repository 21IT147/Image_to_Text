import React, { createContext, useState } from 'react';

// Create a context for userId
export const UserIdContext = createContext();

// Create a provider component
export const UserIdProvider = ({ children }) => {
  // State to hold userId
  const [userId, setUserId] = useState(null);

  // Function to update userId
  const updateUserId = (id) => {
    setUserId(id);
  };

  return (
    <UserIdContext.Provider value={{ userId, updateUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
