import { useContext, useState } from "react";
import { Tabs, Drawer, Form, Input, Button, message } from "antd";

import { AuthContext } from "../../contexts/AuthContext";
import ProfileReviews from "../../components/ProfileReviews";
import ProfileTrades from "../../components/ProfileTrades";
import "./index.scss";

import { updateUser } from "../../api/auth";

import whatsappIcon from "../../assets/whatsapp.svg";
import telegramIcon from "../../assets/telegram.svg";
import twitterIcon from "../../assets/twitter.svg";
import facebookIcon from "../../assets/facebook.svg";
import defaultIcon from "../../assets/socialMedia.svg";
import instagramIcon from "../../assets/instagram.svg";

const { TabPane } = Tabs;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectIcon, setConnectIcon] = useState(defaultIcon);
  const [form] = Form.useForm();

  console.log(user);

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
          <span>
            <h2>{user?.displayName}</h2>
            <small>{user?.email}</small>
            <p>{user?.bio}</p>
          </span>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
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
            displayName: user?.displayName,
            bio: user?.bio,
            connect: user?.connect,
          }}
        >
          <Form.Item label="Name" name="displayName">
            <Input value={user?.displayName} />
          </Form.Item>
          <Form.Item label="Bio" name="bio">
            <Input.TextArea
              value={user?.bio}
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
              value={user?.connect}
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
