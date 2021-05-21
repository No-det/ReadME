import { useState, useEffect, useContext } from "react";
import { Drawer, Input, Form, Button, message } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import TradeCard from "../../components/TradeCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

import { getTrades, addTradePost } from "../../api/trade";

import PlusIcon from "../../assets/plus.svg";
import "./index.scss";

const { TextArea } = Input;

const Trades = () => {
  const [submitting, setSubmitting] = useState(false);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [trades, setTrades] = useState([]);

  const { isDarkTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const data = await getTrades();
        if (data.success) setTrades(data.trades);
        console.log(data);
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      }
    };

    asyncFunction();
  }, []);

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
    addTradePost(payload)
      .then((data) => {
        console.log(data);
        if (data?.success) {
          message.success(data.message);
          form.resetFields();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.toString());
      });
    setSubmitting(false);
  };

  return (
    <div className="trades">
      <div className="trades-head">
        <h2 style={{ color: isDarkTheme ? "#2C3D55" : "#FFFFFF" }}>Trade</h2>
        <div className="posterHead">
          <div className="addResBtn" onClick={() => setDrawerVisibility(true)}>
            <img className="salt" src={PlusIcon} alt="plusIcon" />
            Add Trade
          </div>
        </div>
      </div>
      {trades.length === 0 ? (
        <div className="reviewLoading">
          <h3>Crunching Latest Trade Posts</h3>
          <div className="loader"></div>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 1100: 2, 1400: 3 }}
        >
          <Masonry columnsCount={3} className="trades-posts">
            {trades?.map((trade, key) => (
              <TradeCard
                displayName={trade.displayName}
                email={trade.email}
                description={trade.description}
                bookName={trade.bookName}
                genre={trade.genre}
                photoURL={trade.photoURL}
                key={key}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
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
