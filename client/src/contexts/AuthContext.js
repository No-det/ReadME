import { useState, useEffect, createContext } from "react";

import { auth } from "../firebase/firebase";

export const AuthContext = createContext({ user: null });

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      console.log(user);
      setUser(user);
      if (user) setToken(user.getIdToken());
      else setToken(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
