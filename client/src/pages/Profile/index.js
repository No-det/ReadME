import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import "./index.scss";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profileContainer">
      <div className="profileTop">
        <div className="profileBanner">
          <img src={user?.banner} alt="Banner" />
          <div className="followContainer">
            <div className="following">
              <p>Following</p>
              <span>{user?.following?.length}</span>
            </div>
            <div className="followers">
              <p>Followers</p>
              <span>{user?.followers?.length}</span>
            </div>
          </div>
        </div>
        <div className="profileImage">
          <img src={user?.photoURL} alt={user?.displayName} />
        </div>
      </div>
      <div className="profileContentWrapper">
        <div className="profileContent">
          <h2>{user?.displayName}</h2>
          <small>{user?.email}</small>
          <p>{user?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
