import "./index.scss";
import PlusIcon from "../../assets/plus.svg";
import ReviewCard from "../../components/ReviewCard";
import Saly from "../../assets/saly.svg";
import { Link } from "react-router-dom";
import Arrow from "../../assets/arrowCircle.svg";
import { Button, Drawer, Input, Form, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { addReviewPost, getReviews } from "../../api/review";
import { SearchContext } from "../../contexts/SearchContext";

const { TextArea } = Input;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const { searchResults, isSearching } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getReviews(user.uid)
      .then((reviews) => {
        setReviews(reviews.reviews);
      })
      .catch((err) => {
        console.log(err);
        message.error(
          "Some error occured while fetching the latest reviews. Please try again later."
        );
      });
  }, [user.uid]);

  const addReview = async (values) => {
    setSubmitting(true);
    const payload = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
      ...values,
    };
    console.log(payload);
    addReviewPost(payload)
      .then((data) => {
        console.log(data);
        if (data?.success) {
          message.success(data.message);
          form.resetFields();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmitting(false);
  };

  return (
    <div className="reviewsMain">
      <div className="reviewsCardContainer">
        <div className="reviewHead">
          <h3>Reviews</h3>
          <div className="cardCont">
            {isSearching ? (
              searchResults?.length > 0 ? (
                searchResults?.map((search, key) => (
                  <ReviewCard review={search} key={key} />
                ))
              ) : (
                <div className="reviewLoading">
                  <h3>No search results</h3>
                </div>
              )
            ) : reviews?.length > 0 ? (
              reviews?.map((review, key) => (
                <ReviewCard review={review} key={key} />
              ))
            ) : (
              <div className="reviewLoading">
                <h3>Crunching Latest Book Reviews</h3>
                <div className="loader"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="posterContainer">
        <div className="posterHead">
          <div className="addResBtn" onClick={() => setDrawerVisible(true)}>
            <img className="salt" src={PlusIcon} alt="plusIcon" />
            Add Review
          </div>
        </div>
        <div className="poster">
          <img src={Saly} alt="saly" className="saly" />
          <div className="content">
            <h2>Trade book with fellow readers</h2>
            <Link to="/trades">
              <div className="tradeBtn">
                Start trading
                <img src={Arrow} alt="arrow" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Drawer
        visible={drawerVisible}
        placement="right"
        width={window.innerWidth > 500 ? 500 : 300}
        onClose={() => setDrawerVisible(false)}
        title="Add Review"
      >
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={addReview}
          form={form}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter the name of the book",
              },
            ]}
            label="Book Name"
            name="bookName"
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the name of the book"
            />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
            rules={[
              {
                required: true,
                message: "Please enter the genre of the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the name of the book"
            />
          </Form.Item>
          <Form.Item
            label="Language"
            name="language"
            rules={[
              {
                required: true,
                message: "Please enter the language of the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the language of the book"
            />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: "Please enter the author of the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the author of the book"
            />
          </Form.Item>
          <Form.Item
            label="ISBN Number"
            name="ISBNNumber"
            rules={[
              {
                required: true,
                message: "Please enter the ISBN Number of the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the ISBN Number of the book"
            />
          </Form.Item>
          <Form.Item
            label="Cover Image"
            name="coverImage"
            rules={[
              {
                required: true,
                message: "Please enter the Cover Image of the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the cover image of the book"
            />
          </Form.Item>
          <Form.Item
            label="Link"
            name="linkToPurchase"
            rules={[
              {
                required: true,
                message: "Please enter the link to purchase the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the link to purchase the book"
            />
          </Form.Item>
          <Form.Item
            label="Year of Publication"
            name="yearOfPublication"
            rules={[
              {
                required: true,
                message: "Please enter the year of publication of the book",
              },
            ]}
          >
            <Input
              size="large"
              maxLength={150}
              placeholder="Enter the year of publication of the book"
            />
          </Form.Item>
          <Form.Item
            label="Review"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter your review on the book",
              },
            ]}
          >
            <TextArea
              placeholder="Review of the book you have read"
              showCount
              autoSize={{ minRows: 3, maxRows: 5 }}
              maxLength={500}
            />
          </Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={submitting}
          >
            Post
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Reviews;
