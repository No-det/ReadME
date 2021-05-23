import "./index.scss";

const Message = ({ incoming = false, outgoing = false, message = "" }) => {
  return (
    <div className={`chatMsg ${incoming ? "msgIncoming" : "msgOutgoing"}`}>
      <time>{message.time}</time>
      <p>{message.content}</p>
    </div>
  );
};

export default Message;
