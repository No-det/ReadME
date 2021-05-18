import { Link } from "react-router-dom";
import "./index.scss";
import Post from "./post";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Trades = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="trades">
      <div className="trades-head">
        <h2 style={{ color: isDarkTheme ? "#2C3D55" : "#FFFFFF" }}>Trade</h2>
        <button>Add Resource</button>
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1100: 2, 1400: 3 }}>
        <Masonry className="trades-posts">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Trades;
