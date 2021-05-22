import "./index.scss";
import demoDp from "../../assets/demoDP.png";
import Message from "./Message";
import Search from "../../assets/telegram.svg";
import { useEffect } from "react";

const ChatRoom = () => {
  useEffect(() => {
    let cBody = document.getElementById("cBodyWrapper");
    cBody.scrollTop = cBody.scrollHeight;
  });
  return (
    <div className="chatRoom">
      <div className="cHead">
        <img src={demoDp} alt="dp" />
        <h3>Abhinav</h3>
      </div>
      <div className="cBodyWrapper" id="cBodyWrapper">
        <div className="cBody">
          <Message incoming />
          <Message outgoing />
          <Message outgoing />
          <Message incoming />
          <Message incoming />
          <Message outgoing />
          <Message incoming />
          <Message incoming />
          <Message outgoing />
          <Message outgoing />
          <Message incoming />
          <Message incoming />
          <Message outgoing />
          <Message incoming />
        </div>
      </div>
      <div className="cInput">
        <input />
        <img src={Search} alt="search" />
      </div>
    </div>
  );
};

export default ChatRoom;
