import "./index.scss";
import ChatTile from "./ChatTile";
import ChatRoom from "../../components/ChatRoom";
import Search from "../../assets/search.svg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [selectedReceiver, setSelectedReceiver] = useState({});
  useEffect(() => {
    console.log(selectedReceiver);
  }, [selectedReceiver]);
  return (
    <div className="chatPage">
      <div className="chatSelect">
        <div className="chatSearch">
          <input />
          <img src={Search} alt="search" />
        </div>
        <div className="chatListWrapper">
          <div className="chatList">
            {user?.following?.length > 0 ? (
              user?.following?.map((doc) => (
                <ChatTile
                  onClick={() => setSelectedReceiver(doc)}
                  userData={doc}
                />
              ))
            ) : (
              <p style={{ textAlign: "center" }}>
                Follow some users to start a conversation
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="chatRoomWrapper">
        {Object.keys(selectedReceiver).length > 0 ? (
          <ChatRoom receiver={selectedReceiver} />
        ) : (
          <p style={{ textAlign: "center", marginTop: "40%" }}>
            Select a follower to start the conversation
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
