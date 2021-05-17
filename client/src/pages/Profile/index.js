import "./index.scss";

const Profile = () => {
  return (
    <div className="profileContainer">
      <div className="profileTop">
        <div className="profileBanner">
          <img
            src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
            alt="Banner"
          />
          <div className="followContainer">
            <div className="following">
              <p>Following</p>
              <span>1000</span>
            </div>
            <div className="followers">
              <p>Followers</p>
              <span>236</span>
            </div>
          </div>
        </div>
        <div className="profileImage">
          <img
            src="https://pbs.twimg.com/profile_images/725321660484583424/ArQ4fM3k_400x400.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="profileContentWrapper">
        <div className="profileContent">
          <h2>Betram Gilfoyle</h2>
          <small>gilfoyle@piedpiper.com</small>
          <p>
            Master coder. Satanist. Senior Systems Architect @PiedPiper I hate
            Dinesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
