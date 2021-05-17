import { useState, useEffect, createContext } from "react";

import { auth } from "../firebase/firebase";

export const AuthContext = createContext({ user: null });

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
