import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import dragIcon from "../../assets/move.svg";
import { AuthContext } from "../../contexts/AuthContext";
// import Draggable from "react-draggable";

import "./index.scss";

const FloatingNavbar = ({ location }) => {
  const [selected, setSelected] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === "/trades") setSelected(1);
    else if (location.pathname === "/reviews") setSelected(0);
    else if (location.pathname === `/user/${user?.uid}`) setSelected(2);
    else if (location.pathname === "/chat") setSelected(3);
    else setSelected(-1);
  }, [user, location]);

  return (
    // <Draggable>
    <div
      className="floatingNavbarContainer"
      style={{ display: location.pathname === "/" ? "none" : "flex" }}
    >
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
        to={`/user/${user?.uid}`}
        className={`navLink ${selected === 2 && "selected"}`}
        onClick={() => setSelected(2)}
      >
        <div>Profile</div>
      </Link>
      <Link
        to="/chat"
        className={`navLink ${selected === 3 && "selected"}`}
        onClick={() => setSelected(3)}
      >
        <div>Chat</div>
      </Link>
      <div>
        <img src={dragIcon} alt="drag" id="dragIcon" />
      </div>
    </div>
    // </Draggable>
  );
};

export default withRouter(FloatingNavbar);
