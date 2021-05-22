import { Select } from "antd";

import { genreMap } from "./genremap";

const { Option } = Select;

const Genre = ({ handleFormChange }) => {
  return (
    <Select placeholder="Select Genre" size="large" onChange={handleFormChange}>
      {Object.entries(genreMap).map(([key, value], i) => (
        <Option key={i} value={key}>
          {value}
        </Option>
      ))}
    </Select>
  );
};

export default Genre;
