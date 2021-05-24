import { Select } from "antd";

import { genreMap } from "./genremap";

const { Option } = Select;

const Genre = ({ handleFormChange, isNav = false }) => {
  return (
    <Select placeholder="Select Genre" size="large" onChange={handleFormChange}>
      {Object.entries(genreMap)
        .slice(isNav ? 0 : 1)
        .map(([key, value], i) => (
          <Option key={i} value={key}>
            {value}
          </Option>
        ))}
    </Select>
  );
};

export default Genre;
