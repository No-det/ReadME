import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";
import CryptoJS from "crypto-js";

import { getReview } from "../../api/review";
import { AuthContext } from "../../contexts/AuthContext";

import "./index.scss";

const Review = (props) => {
  const [review, setReview] = useState({});
  const [invalidRoute, setInvalidRoute] = useState(false);
  const [authS3, setAuthS3] = useState("");

  const { user } = useContext(AuthContext);

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
      disqusSignOn();
    };
    asyncFunction();
  }, []);

  const disqusSignOn = () => {
    const disqusData = {
      id: user.uid,
      username: user.email.split("@")[0],
      email: user.email,
      avatar: user.photoURL,
    };

    const disqusStr = JSON.stringify(disqusData);
    const timestamp = Math.round(+new Date() / 1000);

    const message = new Buffer(disqusStr).toString("base64");

    const result = CryptoJS.HmacSHA1(
      message + " " + timestamp,
      process.env.REACT_APP_DISQUS_SECRET
    );
    const hexsig = CryptoJS.enc.Hex.stringify(result);
    setAuthS3(message + " " + hexsig + " " + timestamp);
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
          <div className="reviewComments">
            <div className="commentSection">
              {authS3 && (
                <>
                  {console.log(authS3)}
                  <DiscussionEmbed
                    shortname="readme-3"
                    config={{
                      identifier: props?.match?.params?.id,
                      title: props?.match?.params?.id,
                      remoteAuthS3: authS3,
                      apiKey: process.env.REACT_APP_DISQUS_PUBLIC,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
