import { useState, useContext } from "react";
import { Drawer, Input, Form, Button, message } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import TradeCard from "../../components/TradeCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import demoDP from "../../assets/demoDP.png";

import "./index.scss";
import { addTradePost } from "../../api/trade";

const { TextArea } = Input;

const Trades = () => {
  const [submitting, setSubmitting] = useState(false);
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const { isDarkTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { form } = Form.useForm();

  const addTrade = async (values) => {
    setSubmitting(true);
    const payload = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
      description: values.description,
      bookName: values.bookName,
      genre: values.genre,
    };
    try {
      const data = await addTradePost(payload);
      console.log(data);
      if (data?.success) {
        message.success(data.message);
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
      message.error(err.response.data.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="trades">
      <div className="trades-head">
        <h2 style={{ color: isDarkTheme ? "#2C3D55" : "#FFFFFF" }}>Trade</h2>
        <button onClick={() => setDrawerVisibility(true)}>
          Add Trade Post
        </button>
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1100: 2, 1400: 3 }}>
        <Masonry columnsCount={3} className="trades-posts">
          {[0, 1, 2, 3, 4, 5].map((key) => (
            <TradeCard
              displayName="John Doe"
              email="john@doe.com"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, 
            purus sit amet luctus venenatis Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis 
            Lorem ipsum dolor sit amet,"
              bookName="BOOK_NAME"
              genre="GENRE"
              photoURL={demoDP}
              key={key}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Drawer
        visible={drawerVisibility}
        placement="right"
        width={window.innerWidth > 500 ? 500 : 300}
        onClose={() => setDrawerVisibility(false)}
        title="Add Trade Post"
      >
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={addTrade}
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

export default Trades;
