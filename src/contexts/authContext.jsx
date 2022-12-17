import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext({ token: "", user: {} });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser });
    }
  }, []);
  /* 
  useEffect(() => setLoading(false), [loggedInUser.user]); */

  function handleLogout() {
    window.localStorage.removeItem("loggedInUser");
    setLoggedInUser({ token: "", user: {} });
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        loading,
        handleLogout,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };
