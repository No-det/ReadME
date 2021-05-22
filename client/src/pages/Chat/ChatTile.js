import "./index.scss";
import demoDp from "../../assets/demoDP.png";

const ChatTile = () => {
  return (
    <div className="chatTile">
      <img src={demoDp} alt="dp" />
      <span>
        <h4>Abhinav</h4>
        <p>
          Last message will be displayed here in black color and a medium font
          weight and with a good font size.
        </p>
      </span>
    </div>
  );
};

export default ChatTile;
