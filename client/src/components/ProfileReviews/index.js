import ReviewCard from "../ReviewCard";

import "./index.scss";

const ProfileReviews = ({ reviews }) => {
  console.log(reviews);
  return (
    <div className="profileWrapper">
      {reviews?.length > 0 ? (
        <div className="profileReviewWrapper">
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      ) : (
        <div className="noProfileItems">
          <h3>User has not posted any reviews</h3>
        </div>
      )}
    </div>
  );
};

export default ProfileReviews;
