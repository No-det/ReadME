import "./index.scss";
import PlusIcon from "../../assets/plus.svg";
import ReviewCard from "./ReviewCard";
import Saly from "../../assets/saly.svg";
import Arrow from "../../assets/arrowCircle.svg";

const Reviews = () => {
  return (
    <div className="reviewsMain">
      <div className="reviewsCardContainer">
        <div className="reviewHead">
          <h3>Reviews</h3>
          <div className="cardCont">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </div>
      <div className="posterContainer">
        <div className="posterHead">
          <div className="addResBtn">
            <img className="salt" src={PlusIcon} alt="plusIcon" />
            Add Resource
          </div>
        </div>
        <div className="poster">
          <img src={Saly} alt="saly" className="saly" />
          <div className="content">
            <h2>Trade book with fellow readers</h2>
            <div className="tradeBtn">
              Start trading
              <img src={Arrow} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
