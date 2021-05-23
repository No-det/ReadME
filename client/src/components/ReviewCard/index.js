import { Link } from "react-router-dom";
import "./index.scss";

const ReviewCard = ({ review }) => {
  return (
    <Link to={`/reviews/${review._id}`} className="reviewCardMain">
      <div className="overlay">
        <div className="text">
          <div className="heading">{review?.bookName}</div>
          <p>{review.description.trim().slice(0, 100)}...</p>
        </div>
      </div>
      <img
        onError={(e) =>
          (e.target.src =
            "https://mrb.imgix.net/assets/default-book.png?auto=format&ixlib=react-9.0.3&w=300")
        }
        src={review.coverImage}
        alt={review?.bookName}
      />
    </Link>
  );
};

export default ReviewCard;
