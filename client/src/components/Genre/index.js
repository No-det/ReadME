import { Select } from "antd";

const { Option } = Select;

const Genre = () => {
  return (
    <Select placeholder="Select Genre">
      <Option key="fantasy">Fantasy</Option>
      <Option key="science">Science Fiction</Option>
      <Option key="dystopian">Dystopian</Option>
      <Option key="action">Action and Adventure</Option>
      <Option key="mystery">Mystery</Option>
      <Option key="horror">Horror</Option>
      <Option key="thriller">Thriller and Suspense</Option>
      <Option key="historical">Historical Fiction</Option>
      <Option key="romance">Romance</Option>
      <Option key="women">Women's Fiction</Option>
      <Option key="comptemporary">Contemporary Fiction</Option>
      <Option key="literary">Literary Fiction</Option>
      <Option key="magical">Magical Realism</Option>
      <Option key="graphic">Graphic Novel</Option>
      <Option key="short">Short Story</Option>
      <Option key="young">Young Adult</Option>
      <Option key="new">New Adult</Option>
      <Option key="children">Children's</Option>
      <Option key="memoir">Memoir & Autobiography</Option>
      <Option key="biography">Biography</Option>
      <Option key="food">Food and Drink</Option>
      <Option key="art">Art and Photography</Option>
      <Option key="self">Self-Help</Option>
      <Option key="history">History</Option>
      <Option key="travel">Travel</Option>
      <Option key="crime">True Crime</Option>
      <Option key="hummor">Hummor</Option>
      <Option key="essay">Essays</Option>
      <Option key="tech">Science and Technology</Option>
    </Select>
  );
};

export default Genre;
