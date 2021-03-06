/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import "./index.scss";
import defaultDp from "../../assets/defaultDP.png";

import Message from "./Message";
import Search from "../../assets/telegram.svg";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { message } from "antd";
import { scrollToLatest } from "./utils";
import { Link } from "react-router-dom";

const ChatRoom = ({ receiver }) => {
  const [msgContent, setMsgContent] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { user } = useContext(AuthContext);

  const dbref = db.ref(`messages`);

  const checkRoom = (msg) => {
    return (
      (msg.senderID === user?.uid && msg.receiverID === receiver?.uid) ||
      (msg.senderID === receiver?.uid && msg.receiverID === user?.uid)
    );
  };

  useEffect(() => {
    // setChatHistory(
    //   dbref
    //     .where("senderID", "==", user.uid)
    //     .where("receiverID", "==", receiver.uid)
    //     .where("senderID", "==", receiver.uid)
    //     .where("receiverID", "==", user.uid)
    // );
    dbref
      .once("value")
      .then((snap) => {
        console.log("yeah");
        setChatHistory([]);
        if (snap.exists()) {
          if (snap.val()) {
            Object.keys(snap.val()).map((msgId) => {
              if (checkRoom(snap.val()[msgId])) {
                setChatHistory((prev) => [
                  ...prev,
                  { id: msgId, ...snap.val()[msgId] },
                ]);
              }
            });
          }
        }
      })
      .catch((error) => {
        message.error("Error in fetching messages! Please try again later.");
      });
    dbref.on("child_added", (snap) => {
      if (checkRoom(snap.val())) {
        setChatHistory((prev) => [...prev, snap.val()]);
        // setChatHistory((prev) => [...prev, snap.val()]);
      }
      scrollToLatest();
    });
    scrollToLatest();
  }, [receiver]);

  const sendMessage = async () => {
    if (msgContent) {
      try {
        const dbPushRef = await db.ref(`messages`).push();
        await dbPushRef.set({
          senderID: user.uid,
          receiverID: receiver.uid,
          date: new Date().toLocaleDateString("en-IN"),
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          moment: Date.now(),
          content: msgContent,
        });
      } catch (error) {
        message.error("Error in sending message ! Please try again later.");
      }
      setMsgContent("");
    }
  };
  // useEffect(() => {
  //   dbref.on("child_added", (snap) => {
  //     console.log("before update:", chatHistory);
  //     setChatHistory([...chatHistory, snap.val()]);
  //     console.log("New message : ", snap.val().content);
  //     console.log("after update: ", chatHistory);
  //   });
  // }, []);

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatRoom">
      <div className="cHead">
        <Link to={`/user/${receiver.uid}`}>
          <img
            src={receiver?.photoURL}
            alt="dp"
            onError={(e) => (e.target.src = defaultDp)}
          />
        </Link>
        <h3>{receiver?.name}</h3>
      </div>
      <div className="cBodyWrapper" id="cBodyWrapper">
        <div className="cBody">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg) =>
              msg.senderID === user?.uid ? (
                <Message outgoing message={msg} />
              ) : (
                <Message incoming message={msg} />
              )
            )
          ) : (
            <p className="chatEmptyMessage">
              Send a message to start the conversation
            </p>
          )}
        </div>
      </div>
      <div className="cInput">
        <input
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
          placeholder="Enter your message..."
          onKeyDown={handleSendMessage}
        />
        <img src={Search} onClick={sendMessage} alt="search" />
      </div>
    </div>
  );
};

export default ChatRoom;
