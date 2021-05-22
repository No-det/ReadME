import "./index.scss";

const Message = ({ incoming = false, outgoing = false, message = "" }) => {
  return (
    <div className={`chatMsg ${incoming ? "msgIncoming" : "msgOutgoing"}`}>
      <small>{message.time}</small>
      <p>{message.content}</p>
    </div>
  );
};

export default Message;
