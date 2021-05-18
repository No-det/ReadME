import "./index.scss";
import Demo from "../../../assets/landing.svg";

const ReviewCard = () => {
  return (
    <div className="reviewCardMain">
      <div className="overlay">
        <div className="text">
          <div className="heading">Book Name</div>
          <p>
            Some crazy bad lame description about the book that the person has
            read and is sharing.
          </p>
        </div>
      </div>
      <img
        src="https://www.writersdigest.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg"
        alt="landing"
      />
    </div>
  );
};

export default ReviewCard;
