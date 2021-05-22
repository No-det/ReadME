import { useContext, useEffect, useState } from "react";
import { Tabs, Drawer, Form, Input, Button, message } from "antd";

import { AuthContext } from "../../contexts/AuthContext";
import ProfileReviews from "../../components/ProfileReviews";
import ProfileTrades from "../../components/ProfileTrades";
import "./index.scss";

import { updateUser, getUser } from "../../api/auth";
import { getReviewTrades } from "../../api/profile";

import whatsappIcon from "../../assets/whatsapp.svg";
import telegramIcon from "../../assets/telegram.svg";
import twitterIcon from "../../assets/twitter.svg";
import facebookIcon from "../../assets/facebook.svg";
import defaultIcon from "../../assets/socialMedia.svg";
import instagramIcon from "../../assets/instagram.svg";

const { TabPane } = Tabs;

const Profile = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectIcon, setConnectIcon] = useState(defaultIcon);
  const [profileData, setProfileData] = useState({});
  const [fetchedData, setFetchedData] = useState(false);
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileTrades, setProfileTrades] = useState([]);

  const [form] = Form.useForm();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (props?.match?.params?.id) {
      if (props?.match?.params?.id === user.uid) {
        setMyProfile(true);
        reviews(user.uid);
        setProfileData(user);
        setFetchedData(true);
      } else {
        getUser(props?.match?.params?.id)
          .then((data) => {
            if (data.success) {
              setProfileData(data.user);
              setProfileReviews(data.user.reviews);
              setProfileTrades(data.user.trades);
              setFetchedData(true);
            }
          })
          .catch((err) => {
            if (err.message) {
              message.error(err.message);
              setFetchedData(true);
            }
          });
      }
    } else {
      setMyProfile(true);
      reviews(user.uid);
      setProfileData(user);
      setFetchedData(true);
    }
  }, [user, props]);

  const reviews = (uid, data) => {
    getReviewTrades(uid)
      .then((data) => {
        if (data.success) {
          setProfileReviews(data.reviews);
          setProfileTrades(data.trades);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
  };

  const handleMediaChange = (e) => {
    let value = e.target.value;
    if (value.includes("facebook")) setConnectIcon(facebookIcon);
    else if (value.includes("twitter")) setConnectIcon(twitterIcon);
    else if (value.includes("telegram")) setConnectIcon(telegramIcon);
    else if (value.includes("instagram")) setConnectIcon(instagramIcon);
    else if (value.includes("whatsapp")) setConnectIcon(whatsappIcon);
    else setConnectIcon(defaultIcon);
  };

  const handleUpdateProfile = async (data) => {
    if (data.displayName && data.bio && data.connect) {
      setIsSubmitting(true);
      const payload = {
        displayName: data.displayName,
        bio: data.bio,
        connect: data.connect,
      };
      updateUser(payload)
        .then((data) => {
          console.log(data);
          if (data?.success) {
            message.success(data.message);
            form.resetFields();
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(err.toString());
        });
      setIsSubmitting(false);
      setIsEditing(false);
    } else {
      message.error("Please fill out all the fields !");
    }
  };

  return (
    <div className="profileContainer">
      {Object.keys(profileData)?.length === 0 ? (
        fetchedData ? (
          <div>User does not exist</div>
        ) : (
          <div className="reviewLoading">
            <h3>Fetching user data...</h3>
            <div className="loader"></div>
          </div>
        )
      ) : (
        <div>
          <div className="profileTop">
            <div className="profileBanner">
              <img src={profileData?.banner} alt="Banner" />
              <div className="followContainer">
                <div className="following">
                  <p>Following</p>
                  <span>{profileData?.following?.length}</span>
                </div>
                <div className="followers">
                  <p>Followers</p>
                  <span>{profileData?.followers?.length}</span>
                </div>
              </div>
            </div>
            <div className="profileImage">
              <img src={profileData?.photoURL} alt={profileData?.displayName} />
            </div>
          </div>
          <div className="profileContentWrapper">
            <div className="profileContent">
              <span>
                <h2>{profileData?.displayName}</h2>
                <small>{profileData?.email}</small>
                <p>{profileData?.bio}</p>
              </span>
              {myProfile && (
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </div>
            <div className="mobileFollowContainer">
              <p>
                <span>{profileData?.following?.length}</span> Following
              </p>
              <p>
                <span>{profileData?.followers?.length}</span> Followers
              </p>
            </div>
          </div>
          <div className="profilePosts">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Reviews" key="1">
                <ProfileReviews reviews={profileReviews} />
              </TabPane>
              <TabPane tab="Trades" key="2">
                <ProfileTrades trades={profileTrades} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}

      <Drawer
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        width={window.innerWidth > 500 ? 500 : 300}
        title="Edit Profile"
      >
        <Form
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{
            displayName: profileData?.displayName,
            bio: profileData?.bio,
            connect: profileData?.connect,
          }}
        >
          <Form.Item label="Name" name="displayName">
            <Input value={profileData?.displayName} />
          </Form.Item>
          <Form.Item label="Bio" name="bio">
            <Input.TextArea
              value={profileData?.bio}
              showCount
              autoSize={{ minRows: 3, maxRows: 5 }}
              maxLength={200}
            />
          </Form.Item>
          <Form.Item
            name="connect"
            label="Social Media Link"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input
              value={profileData?.connect}
              onChange={(e) => handleMediaChange(e)}
              addonBefore={
                <img src={connectIcon} className="connectIcon" alt="icon" />
              }
            />
          </Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={isSubmitting}
          >
            Post
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Profile;
