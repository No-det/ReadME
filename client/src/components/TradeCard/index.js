import { Link } from "react-router-dom";
import "./index.scss";

const TradeCard = ({
  displayName,
  photoURL,
  email,
  description,
  bookName,
  genre,
}) => {
  return (
    <div className="trade-post">
      <div className="head">
        <div className="head-left">
          <img src={photoURL} alt="dp" />
          <span>
            <h3>{displayName}</h3>
            <a href={`mailto:${email}`}>{email}</a>
          </span>
        </div>
        <button>Connect</button>
      </div>
      <p className="body">{description}</p>
      <div className="foot">
        <Link to="/">@{bookName}</Link>
        <Link to="/">@{genre}</Link>
      </div>
    </div>
  );
};

export default TradeCard;
