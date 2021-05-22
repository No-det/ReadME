import { Link } from "react-router-dom";
import "./index.scss";

const UserTile = ({ user, title, followers }) => {
  return (
    <Link to={`/user/${user?.uid}`} className="followTile">
      <div className="followImage">
        <img src={user?.photoURL} alt={user?.name?.charAt(0)} />
      </div>
      <div className="followContent">
        <div className="followName">{user?.name}</div>
        <div className="followEmail">{user?.email}</div>
      </div>
      <div className="followFollow">
        {title !== "Following" &&
          (followers.filter((f) => f.uid === user?.uid).length > 0 ? (
            <button>Unfollow</button>
          ) : (
            <button>Follow</button>
          ))}
      </div>
    </Link>
  );
};

export default UserTile;
