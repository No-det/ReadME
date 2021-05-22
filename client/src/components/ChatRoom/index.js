import "./index.scss";
import demoDp from "../../assets/demoDP.png";
import Message from "./Message";
import Search from "../../assets/telegram.svg";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { message } from "antd";

const ChatRoom = ({ receiver }) => {
  const { user } = useContext(AuthContext);
  const [msgContent, setMsgContent] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  useEffect(() => {
    try {
      const dbref = db.ref(`messages/`);
      // setChatHistory(
      //   dbref
      //     .where("senderID", "==", user.uid)
      //     .where("receiverID", "==", receiver.uid)
      //     .where("senderID", "==", receiver.uid)
      //     .where("receiverID", "==", user.uid)
      // );
      console.log("yyay");
      dbref.once("value", (snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val()) {
            console.log(snapshot.val());
          }
        }
      });
    } catch (error) {
      message.error("Error in fetching messages ! Please try again later.");
    }
    let cBody = document.getElementById("cBodyWrapper");
    cBody.scrollTop = cBody.scrollHeight;
  }, []);
  const sendMessage = async () => {
    try {
      const dbref = db.ref(`messages/`);
      await dbref.set({
        senderID: user.uid,
        receiverID: receiver.uid,
        date: new Date().toLocaleDateString("en-IN"),
        time: new Date().toLocaleTimeString("en-IN"),
        content: msgContent,
      });
    } catch (error) {
      message.error("Error in sending message ! Please try again later.");
    }
    setMsgContent("");
  };
  return (
    <div className="chatRoom">
      <div className="cHead">
        <img src={receiver?.photoURL} alt="dp" />
        <h3>{receiver?.name}</h3>
      </div>
      <div className="cBodyWrapper" id="cBodyWrapper">
        <div className="cBody">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg) =>
              msg.senderID === user.uid ? (
                <Message outgoing message={msg} />
              ) : (
                <Message incoming message={msg} />
              )
            )
          ) : (
            <p style={{ textAlign: "center" }}>
              Send a message to start the conversation
            </p>
          )}
        </div>
      </div>
      <div className="cInput">
        <input
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
        />
        <img src={Search} onClick={sendMessage} alt="search" />
      </div>
    </div>
  );
};

export default ChatRoom;
