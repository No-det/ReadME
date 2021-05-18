import { useState, useEffect } from "react";

const ProfileReviews = ({ reviews }) => {
  return (
    <>
      {reviews?.length > 0 ? (
        <div>
          <h2>here are the reviews</h2>
        </div>
      ) : (
        <div className="profileReview">
          <h2>User has not posted any reviews</h2>
        </div>
      )}
    </>
  );
};

export default ProfileReviews;
