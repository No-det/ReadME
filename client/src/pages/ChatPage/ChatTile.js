import { Link } from "react-router-dom";

import defaultDp from "../../assets/defaultDP.png";

import "./index.scss";

const ChatTile = ({ userData }) => {
  return (
    <Link to={`/chat/${userData.uid}`} className="chatTile">
      <img
        src={userData?.photoURL}
        onError={(e) => (e.target.src = defaultDp)}
        alt="dp"
      />
      <span>
        <h4>{userData?.name}</h4>
        <p>
          Last message will be displayed here in black color and a medium font
          weight and with a good font size.
        </p>
      </span>
    </Link>
  );
};

export default ChatTile;
