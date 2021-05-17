import { Link } from "react-router-dom";
import "./index.scss";
import demoDP from "../../assets/demoDP.png"

const Post = () => {
    return  <div className="trade-post">
        <div className="head">
            <div className="head-left">
                <img src={demoDP} alt="dp" />
                <span>
                    <h3>John Doe</h3>
                    <Link>john@doe.com</Link>
                </span>
            </div>
            <button>Connect</button>
        </div>
        <p className="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, 
            purus sit amet luctus venenatis Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis 
            Lorem ipsum dolor sit amet,
        </p>
        <div className="foot">
            <Link href="/">@BOOK_NAME</Link>
            <Link href="/">@GENRE</Link>
        </div>
    </div>
}

export default Post;
