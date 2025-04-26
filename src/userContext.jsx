import { createContext, useContext, useState, useEffect } from "react";

const defaultUser = {
  username: "",
  email: "",
  age: "",
  gender: "",
};

const UserContext = createContext({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          setUser(JSON.parse(storedUserData));
        } catch (error) {
          console.error("Error parsing userData from localStorage", error);
          setUser(defaultUser); // set default user if error happens
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.error("Error saving userData to localStorage", error);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
