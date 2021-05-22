import "./index.scss";
import ChatTile from "./ChatTile";
import ChatRoom from "../../components/ChatRoom";
import Search from "../../assets/search.svg";

const ChatPage = () => {
  return (
    <div className="chatPage">
      <div className="chatSelect">
        <div className="chatSearch">
          <input />
          <img src={Search} alt="search" />
        </div>
        <div className="chatListWrapper">
          <div className="chatList">
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
          </div>
        </div>
      </div>
      <div className="chatRoomWrapper">
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatPage;
