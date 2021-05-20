import { Comment, message, Avatar, Form, Input, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { addComment, getReview } from "../../api/review";
import { AuthContext } from "../../contexts/AuthContext";

import CommentList from "../../components/CommentList";

import "./index.scss";

const { TextArea } = Input;

const Review = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [review, setReview] = useState({});
  const [invalidRoute, setInvalidRoute] = useState(false);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);

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
    };
    asyncFunction();
  }, []);

  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    const payload = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      comment: value,
      upvote: 0,
    };
    console.log(payload);
    // addComment(props?.match?.params?.id, payload)
    //   .then((res) => {
    //     if (res.success) {
    //       setComments(res.comments);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error("Some error occured! Please try again later");
    //   });
    setSubmitting(false);
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
            <h3 className="comments">
              <span className="numberOfComments">{comments.length}</span>{" "}
              Comments
            </h3>
            {comments.length > 0 &&
              comments.map((comment) => <CommentList comment={comment} />)}
            <Comment
              avatar={<Avatar src={user?.photoURL} alt={user?.displayName} />}
              content={
                <Editor
                  onChange={(e) => setValue(e.target.value)}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
