import "./index.scss";
import defaultDp from "../../assets/defaultDP.png";

const ChatTile = ({ onClick, userData }) => {
  return (
    <div className="chatTile" onClick={onClick}>
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
    </div>
  );
};

export default ChatTile;
