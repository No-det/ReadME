import "./index.scss";
import PlusIcon from "../../assets/plus.svg";
import ReviewCard from "../../components/ReviewCard";
import Saly from "../../assets/saly.svg";
import { Link } from "react-router-dom";
import Arrow from "../../assets/arrowCircle.svg";
import { Button, Drawer, Input, Form } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const { TextArea } = Input;

const Reviews = () => {
  const [submitting, setSubmitting] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const { user } = useContext(AuthContext);

  const addReview = async (values) => {
    setSubmitting(true);
    const payload = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
      ...values,
    };
    // addTradePost(payload)
    //   .then((data) => {
    //     console.log(data);
    //     if (data?.success) {
    //       message.success(data.message);
    //       form.resetFields();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error(err.toString());
    //   });
    setSubmitting(false);
  };

  return (
    <div className="reviewsMain">
      <div className="reviewsCardContainer">
        <div className="reviewHead">
          <h3>Reviews</h3>
          <div className="cardCont">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
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
            name="isbn"
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
            name="cover"
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
            name="link"
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
            name="yop"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter some description",
              },
            ]}
          >
            <TextArea
              placeholder="Description of what you are looking for to trade with others and what you are trading. Making it short and sweet helps :)"
              showCount
              autoSize={{ minRows: 3, maxRows: 5 }}
              maxLength={200}
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
