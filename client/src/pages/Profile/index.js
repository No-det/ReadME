import "./index.scss";

const Profile = () => {
  return (
    <div className="profileContainer">
      <div className="profileTop">
        <div className="profileBanner">
          <img
            src="https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
            src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500#"
            alt=""
          />
        </div>
      </div>
      <div className="profileContentWrapper">
        <div className="profileContent">
          <h2>John Doe</h2>
          <small>john@doe.com</small>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            perferendis exercitationem hic laboriosam eligendi iusto corrupti,
            sapiente ut recusandae at quas ipsa tempore qui quasi esse neque
            consectetur, non,cipit, soluta numquam autem animi quos
            reprehenderit ea porro at!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
