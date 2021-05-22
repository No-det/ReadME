import "./index.scss";

const Message = ({ incoming = false, outgoing = false }) => {
  return (
    <div className={`chatMsg ${incoming ? "msgIncoming" : "msgOutgoing"}`}>
      <small>23:34</small>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default Message;
