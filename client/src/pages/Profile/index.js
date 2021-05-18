import { useContext } from "react";
import { Tabs } from "antd";

import { AuthContext } from "../../contexts/AuthContext";
import ProfileReviews from "../../components/ProfileReviews";
import ProfileTrades from "../../components/ProfileTrades";
import "./index.scss";

const { TabPane } = Tabs;

const Profile = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

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
        <div className="mobileFollowContainer">
          <p>
            <span>{user?.following?.length}</span> Following
          </p>
          <p>
            <span>{user?.followers?.length}</span> Followers
          </p>
        </div>
      </div>
      <div className="profilePosts">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Reviews" key="1">
            <ProfileReviews reviews={user?.reviews} />
          </TabPane>
          <TabPane tab="Trades" key="2">
            <ProfileTrades trades={user?.trades} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
