import { message } from "antd";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { follow } from "../../api/profile";
import { AuthContext } from "../../contexts/AuthContext";

import "./index.scss";

const UserTile = ({ user: userData, title, followers, following }) => {
  const { user, setUser } = useContext(AuthContext);

  const { id: paramId } = useParams();

  const followUnfollow = (payload) => {
    follow(payload)
      .then((data) => {
        console.log(data);
        if (data.success) setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.data.message);
      });
  };

  return (
    <div className="followTile">
      <Link to={`/user/${userData?.uid}`} className="followImage">
        <img src={userData?.photoURL} alt={userData?.name?.charAt(0)} />
      </Link>
      <Link to={`/user/${userData?.uid}`} className="followContent">
        <div className="followName">{userData?.name}</div>
        <div className="followEmail">{userData?.email}</div>
      </Link>
      <div className="followFollow">
        {paramId === user.uid &&
          (user.uid !== userData.uid && title === "Following" ? (
            <button onClick={() => followUnfollow(userData)}>Unfollow</button>
          ) : followers.filter((f) => f.uid === userData?.uid).length > 0 ? (
            <button onClick={() => followUnfollow(userData)}>Unfollow</button>
          ) : (
            <button onClick={() => followUnfollow(userData)}>Follow</button>
          ))}
      </div>
    </div>
  );
};

export default UserTile;
