import TradeCard from "../TradeCard";

import "./index.scss";

const ProfileTrades = ({ trades }) => {
  return (
    <div className="profileTradeWrapper">
      {trades.length > 0 ? (
        <div className="profileTradeContainer">
          {trades.map((trade) => (
            <TradeCard
              displayName={trade?.displayName}
              photoURL={trade?.photoURL}
              email={trade?.email}
              description={trade?.description}
              bookName={trade?.bookName}
              genre={trade?.genre}
            />
          ))}
        </div>
      ) : (
        <div className="noProfileItems">
          <h3>User has not posted any trade</h3>
        </div>
      )}
    </div>
  );
};

export default ProfileTrades;
