/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Input, Form, message, Empty } from "antd";

import ReviewCard from "../../components/ReviewCard";
import Genre from "../../components/Genre";

import { addReviewPost } from "../../api/review";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";

import PlusIcon from "../../assets/plus.svg";
import Saly from "../../assets/saly.svg";
import Arrow from "../../assets/arrowCircle.svg";

import "./index.scss";
const { TextArea } = Input;

const Reviews = () => {
  // const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState("");

  const [form] = Form.useForm();
  const { searchResults } = useContext(SearchContext);
  const { user, reviews } = useContext(AuthContext);

  useEffect(() => {
    const tempReviews = [];
    reviews?.filter((review) => {
      const temp =
        review.bookName.toLowerCase().includes(searchResults.toLowerCase()) ||
        review.language.toLowerCase().includes(searchResults.toLowerCase()) ||
        review.author.toLowerCase().includes(searchResults.toLowerCase()) ||
        review.displayName.toLowerCase().includes(searchResults.toLowerCase());
      if (temp) tempReviews.push(review);
    });
    setFilteredSearch(tempReviews);
  }, [searchResults, reviews]);

  const handleFormChange = (value) => {
    form.setFieldsValue({
      genre: value,
    });
  };

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
    <>
      <div className="reviewTop">
        <h3>Reviews</h3>
        <div className="posterHead">
          <div className="addResBtn" onClick={() => setDrawerVisible(true)}>
            <img className="salt" src={PlusIcon} alt="plusIcon" />
            <span>Add Review</span>
          </div>
        </div>
      </div>
      <div className="reviewsMain">
        <div className="reviewsCardContainer">
          <div className="reviewHead">
            <div className="cardCont">
              {filteredSearch.length !== 0 ? (
                filteredSearch.map((search, key) => (
                  <ReviewCard key={key} review={search} />
                ))
              ) : (
                <Empty description="Oops! Couldn't find any reviews." />
              )}
            </div>
          </div>
        </div>
        <div className="posterContainer">
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
              <Genre handleFormChange={handleFormChange} />
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
    </>
  );
};

export default Reviews;
