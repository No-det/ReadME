import "./index.scss";
import TradeCard from "../../components/TradeCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";
import Masonry from "react-responsive-masonry";

import demoDP from "../../assets/demoDP.png";

const Trades = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="trades">
      <div className="trades-head">
        <h2 style={{ color: isDarkTheme ? "#2C3D55" : "#FFFFFF" }}>Trade</h2>
        <button>Add Resource</button>
      </div>
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
    </div>
  );
};

export default Trades;
