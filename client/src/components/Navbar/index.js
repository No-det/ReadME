import "./index.scss";
import Logo from "../../assets/logoME.svg";
import Search from "../../assets/search.svg";

const Navbar = ({ children }) => {
  return (
    <>
      <div className="navMain">
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
          <h2>readMe</h2>
        </div>
        <div className="actionContainer">
          <select placeholder="Select genre">
            <option key="one">One</option>
            <option key="one">One</option>
            <option key="one">One</option>
          </select>
          <input type="text" placeholder="Search for a book" />
          <div className="searchBtn">
            <img src={Search} alt="search icon" />
          </div>
        </div>
      </div>
      <div className="navContent">{children}</div>
    </>
  );
};

export default Navbar;
