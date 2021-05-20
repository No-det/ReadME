import { useState, useEffect, createContext } from "react";

import { addUser } from "../api/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext({ user: null });

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setUser(user);
      if (user) {
        // console.log("new", await user.getIdToken());
        setToken(user.getIdToken());
        try {
          const data = await addUser(user);
          if (data.success) {
            setUser(data.user);
          }
        } catch (err) {
          console.log(err);
        }
      } else setToken(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setUser }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
