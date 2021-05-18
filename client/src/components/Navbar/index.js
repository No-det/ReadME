import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Select } from "antd";

import Logo from "../../assets/logoME.svg";
import Search from "../../assets/search.svg";
import googleIcon from "../../assets/google.svg";

import { AuthContext } from "../../contexts/AuthContext";
import { signInWithGoogle } from "../../firebase/firebase";
import "./index.scss";

const { Option } = Select;

const Navbar = ({ children }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const signIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) history.push("/reviews");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="navMain">
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
          <h2>readMe</h2>
        </div>
        {user ? (
          <div className="actionContainer">
            <Select placeholder="Select Genre">
              <Option key="1">One</Option>
              <Option key="2">Two</Option>
              <Option key="3">One</Option>
            </Select>
            <input type="text" placeholder="Search for a book" />
            <div className="searchBtn">
              <img src={Search} alt="search icon" />
            </div>
          </div>
        ) : (
          <div className="googleButton" onClick={signIn}>
            <img src={googleIcon} alt="G" />
            Signin with Google
          </div>
        )}
      </div>
      <div className="navContent">{children}</div>
    </>
  );
};

export default Navbar;
