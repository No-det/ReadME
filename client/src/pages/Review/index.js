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
        <h2>This is the book review page for {props?.match?.params?.id}</h2>
      )}
    </div>
  );
};

export default Review;
