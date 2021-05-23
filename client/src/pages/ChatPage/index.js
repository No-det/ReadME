import { useContext, useState, useEffect } from "react";
import { Input, message } from "antd";
import { useHistory } from "react-router";

import { AuthContext } from "../../contexts/AuthContext";

import ChatRoom from "../../components/ChatRoom";
import ChatTile from "./ChatTile";

import Search from "../../assets/search.svg";

import "./index.scss";
import { getUser, updateChatMembers } from "../../api/auth";

const ChatPage = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedReceiver, setSelectedReceiver] = useState({});
  const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(() => {
    console.log(props);
    if (props?.match?.params?.uid) {
      updateChatMembers(props?.match?.params?.uid)
        .then((data) => {
          if (data.success) {
            setUser(data.user);
            setSelectedReceiver(
              data?.user?.chats?.filter(
                (chat) => chat.uid === props?.match?.params?.uid
              )[0]
            );
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(err.data.message);
          history.push("/chat");
        });
    }
  }, [props?.match?.params?.uid]);

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
            {user?.chats?.length > 0 ? (
              user?.chats
                ?.filter((chat) =>
                  chat.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((doc) => <ChatTile userData={doc} />)
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
