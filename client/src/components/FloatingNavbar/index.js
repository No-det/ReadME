import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./index.scss";

const FloatingNavbar = ({ location }) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (location.pathname === "/trades") setSelected(1);
    else if (location.pathname === "/reviews") setSelected(0);
    else if (location.pathname === "/profile") setSelected(2);
  }, [location]);

  return (
    <div className="floatingNavbarContainer">
      <Link
        to="/reviews"
        className={`navLink ${selected === 0 && "selected"}`}
        onClick={() => setSelected(0)}
      >
        <div>Reviews</div>
      </Link>
      <Link
        to="/trades"
        className={`navLink ${selected === 1 && "selected"}`}
        onClick={() => setSelected(1)}
      >
        <div>Trades</div>
      </Link>
      <Link
        to="/profile"
        className={`navLink ${selected === 2 && "selected"}`}
        onClick={() => setSelected(2)}
      >
        <div>Profile</div>
      </Link>
    </div>
  );
};

export default withRouter(FloatingNavbar);
