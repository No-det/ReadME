import { Link } from "react-router-dom";
import "./index.scss";
import Post from "./post";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";
import Masonry from 'react-responsive-masonry'

const Trades = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    return <div className="trades">
        <div className="trades-head">
            <h3>Trade</h3>
            <button>Add Resource</button>
        </div>
        <Masonry columnsCount={3} className="trades-posts">
            <Post />
            <Post />
            <Post />
            <Post />
        </Masonry>
    </div>
}

export default Trades;
