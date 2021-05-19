import { Link } from "react-router-dom";
import "./index.scss";

const ReviewCard = ({ review }) => {
  return (
    <Link to={`/reviews/${review._id}`} className="reviewCardMain">
      <div className="overlay">
        <div className="text">
          <div className="heading">{review?.bookName}</div>
          <p>{review.description}</p>
        </div>
      </div>
      <img src={review.coverImage} alt={review?.bookName} />
    </Link>
  );
};

export default ReviewCard;
