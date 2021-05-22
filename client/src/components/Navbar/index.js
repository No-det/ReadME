import { useCallback, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Switch } from "antd";

import Logo from "../../assets/logoME.svg";
import Search from "../../assets/search.svg";
import googleIcon from "../../assets/google.svg";

import { AuthContext } from "../../contexts/AuthContext";
import { signInWithGoogle } from "../../firebase/firebase";
import "./index.scss";
import debounce from "lodash/debounce";
import { SearchContext } from "../../contexts/SearchContext";
import Genre from "../Genre";
import { ThemeContext } from "../../contexts/ThemeContext";

const Navbar = ({ children }) => {
  const history = useHistory();
  const { user, reviews } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const { setSearchResults, setIsSearching } = useContext(SearchContext);
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
  };

  const onChange = ({ target }) => {
    setSearch(target.value);
    debounceSearch(target.value);
    if (!target.value) setIsSearching(false);
    else setIsSearching(true);
  };

  const searchReviews = (value) => {
    let newSearch = reviews?.filter((review) =>
      review.bookName.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(newSearch);
    console.log(newSearch);
  };

  const debounceSearch = useCallback(
    debounce((value) => searchReviews(value), 200),
    []
  );

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
          <div className="navToggleTheme">
            <Switch defaultChecked onChange={toggleTheme} />
          </div>
        </span>
        {user ? (
          <Form className="actionContainer">
            <Form.Item name="genre">
              <Genre handleFormChange={handleFormChange} />
            </Form.Item>
            <Form.Item name="search">
              <Input
                className="customInputSearch"
                type="text"
                placeholder="Search for a book"
                onChange={onChange}
                allowClear
                value={search}
              />
            </Form.Item>
            <div className="searchBtn">
              <img src={Search} alt="search icon" />
            </div>
          </Form>
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
