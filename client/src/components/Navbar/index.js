import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Switch } from "antd";

import Logo from "../../assets/logoME.svg";
import Search from "../../assets/search.svg";
import googleIcon from "../../assets/google.svg";

import Genre from "../Genre";
import { signInWithGoogle } from "../../firebase/firebase";

import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SearchContext } from "../../contexts/SearchContext";

import "./index.scss";

const Navbar = ({ children }) => {
  const history = useHistory();
  const { user, reviews, allReviews, setReviews } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const { setSearchResults, setIsSearching, searchResults } =
    useContext(SearchContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  const [form] = Form.useForm();

  const signIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) history.push("/reviews");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormChange = (value) => {
    form.setFieldsValue({
      genre: value,
    });
    const tempReviews = [];
    if (value === "all") {
      setReviews(allReviews);
    } else {
      allReviews.map((review) => {
        if (review.genre === value) tempReviews.push(review);
      });
      console.log(tempReviews);
      setReviews(tempReviews);
    }
  };

  const onChange = ({ target }) => {
    setSearchResults(target.value);
    if (!target.value) setIsSearching(false);
    else setIsSearching(true);
  };

  const toggleTheme = () => {
    if (document.body.className.includes("darkMode"))
      document.body.classList.replace("darkMode", "lightMode");
    else document.body.classList.replace("lightMode", "darkMode");
  };

  return (
    <>
      <div className="navMain">
        <span className="navMainLogo">
          <Link to="/">
            <div className="logoContainer">
              <img src={Logo} alt="logo" />
              <h2>readMe</h2>
            </div>
          </Link>
          <div className="navToggleTheme" style={{ display: "none" }}>
            <Switch defaultChecked onChange={toggleTheme} />
          </div>
          {!user && (
            <div className="googleButton" onClick={signIn}>
              <img src={googleIcon} alt="G" />
              Signin with Google
            </div>
          )}
        </span>
        {user && (
          <div className="actionContainer">
            <Genre handleFormChange={handleFormChange} isNav />
            <div className="inputSearchWrapper">
              <Input
                className="customInputSearch"
                type="text"
                placeholder="Search for a book/author/language"
                onChange={onChange}
                allowClear
                value={searchResults}
              />
              <div className="searchBtn">
                <img src={Search} alt="search icon" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="navContent">{children}</div>
    </>
  );
};

export default Navbar;
