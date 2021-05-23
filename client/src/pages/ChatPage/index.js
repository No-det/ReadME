import "./index.scss";
import ChatTile from "./ChatTile";
import ChatRoom from "../../components/ChatRoom";
import Search from "../../assets/search.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Input } from "antd";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [selectedReceiver, setSelectedReceiver] = useState({});
  const [search, setSearch] = useState("");

  return (
    <div className="chatPage">
      <div className="chatSelect">
        <div className="chatSearch">
          <Input
            placeholder="Enter the name."
            onChange={({ target }) => setSearch(target.value)}
          />
          <img src={Search} alt="search" />
        </div>
        <div className="chatListWrapper">
          <div className="chatList">
            {user?.following?.length > 0 ? (
              user?.following
                ?.filter((follower) =>
                  follower.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((doc) => (
                  <ChatTile
                    onClick={() => setSelectedReceiver(doc)}
                    userData={doc}
                  />
                ))
            ) : (
              <p className="chatEmptyMessage">
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
          <p className="chatEmptyMessage">
            Select a follower to start the conversation
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
