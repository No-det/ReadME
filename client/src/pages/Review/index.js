import { message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getReview } from "../../api/review";

import "./index.scss";

const Review = (props) => {
  const [review, setReview] = useState({});
  const [invalidRoute, setInvalidRoute] = useState(false);

  useEffect(() => {
    const asyncFunction = async () => {
      if (props?.match?.params?.id) {
        try {
          const data = await getReview(props?.match?.params?.id);
          setReview(data.review);
        } catch (err) {
          console.log(err);
          console.log(err.data.message);
          message.error(err.data.message);
          setInvalidRoute(true);
        }
      }
    };
    asyncFunction();
  }, []);

  return (
    <div>
      {invalidRoute ? (
        <div className="invalidWrapper">
          <h3>Review not found!</h3>
          <p>User may have deleted the review or the review id is invalid</p>
          <Link to="/reviews">Check other latest reviews</Link>
        </div>
      ) : (
        <div className="reviewContainer">
          <div className="reviewLeftContainer">
            <img src={review?.coverImage} alt={review?.bookName} />
          </div>
          <div className="reviewRightContainer">
            <p>
              <span>Book Name</span>
              <span>: {review?.bookName}</span>
            </p>
            <p>
              <span>Genre</span>
              <span>: {review?.genre}</span>
            </p>
            <p>
              <span>ISBN Number</span>
              <span>: {review?.ISBNNumber}</span>
            </p>
            <p>
              <span>Language</span>
              <span>: {review?.language}</span>
            </p>
            <p>
              <span>Author</span>
              <span>: {review?.author}</span>
            </p>
            <p>
              <span>Link to Purchase</span>
              <span>: {review?.linkToPurchase}</span>
            </p>
            <p>
              <span>Year Of Publication</span>
              <span>: {review?.yearOfPublication}</span>
            </p>
            <p>
              <span>Description</span>
              <span>: {review?.description}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
