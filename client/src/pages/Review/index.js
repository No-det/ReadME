import { message, Rate } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";

import { getReview, rateReview } from "../../api/review";
import { genreMap } from "../../components/Genre/genremap";

import "./index.scss";

const Review = (props) => {
  const [review, setReview] = useState({});
  const [invalidRoute, setInvalidRoute] = useState(false);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const asyncFunction = async () => {
      if (props?.match?.params?.id) {
        try {
          const data = await getReview(props?.match?.params?.id);
          console.log(data);
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

  const rate = (value) => {
    setRating(value);

    const params = { id: props?.match.params.id, rating: value };
    rateReview(params)
      .then((res) => {
        if (res.success) message.success(res.message.toString());
      })
      .catch((err) => message.error(err.toString()));
  };

  return (
    <div>
      {invalidRoute ? (
        <div className="invalidWrapper">
          <h3>Review not found!</h3>
          <p>User may have deleted the review or the review id is invalid</p>
          <Link to="/reviews">Check other latest reviews</Link>
        </div>
      ) : (
        <div className="reviewWrapper">
          <div className="reviewContainer">
            <div className="reviewLeftContainer">
              <img
                src={review?.coverImage}
                alt={review?.bookName}
                height="500"
                width="320"
              />
              <p>
                <span>Rating</span>
                <Rate defaultValue={4} onChange={rate} />
                (4.5)
              </p>
            </div>
            <div className="reviewRightContainer">
              <p>
                <span>Review of the Book</span>
                <span>: {review?.bookName}</span>
              </p>
              <p>
                <span>Review written by</span>
                <span>
                  :{" "}
                  <Link to={`/user/${review?.uid}`}>{review?.displayName}</Link>
                </span>
              </p>
              <p>
                <span>Genre</span>
                <span>: {genreMap[review?.genre]}</span>
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
          <div className="reviewComments">
            <div className="commentSection">
              <DiscussionEmbed
                shortname="readme-3"
                config={{
                  identifier: props?.match?.params?.id,
                  title: props?.match?.params?.id,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
