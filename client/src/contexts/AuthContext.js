import { message } from "antd";
import { useState, useEffect, createContext } from "react";

import { addUser } from "../api/auth";
import { getReviews } from "../api/review";
import { getTrades } from "../api/trade";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext({ user: null });

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [trades, setTrades] = useState([]);

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
            getAllReviews();
            await getAllTrades();
          }
        } catch (err) {
          console.log(err);
        }
      } else setToken(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const getAllReviews = () => {
    getReviews()
      .then((res) => {
        console.log(res);
        if (res.success) {
          setReviews(res.reviews);
          setAllReviews(res.reviews);
        } else message.error(res.message);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.toString());
      });
  };

  const getAllTrades = async () => {
    try {
      const data = await getTrades();
      console.log(data);
      if (data.success) setTrades(data.trades.reverse());
      console.log(data);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, reviews, allReviews, trades, setReviews }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
