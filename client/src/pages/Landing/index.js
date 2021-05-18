import { useHistory } from "react-router-dom";

import { signInWithGoogle } from "../../firebase/firebase";
import landingImage from "../../assets/landing.png";

import "./index.scss";

const Landing = () => {
  const history = useHistory();

  const signIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) history.push("/reviews");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="landing__container">
      <main>
        <h1>A great eye for good books.</h1>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={() => signIn()}>
          Get Started For Free
        </a>
      </main>
      <div className="imageWrapper">
        <img src={landingImage} alt="Landing Illustration" />
      </div>
    </div>
  );
};

export default Landing;
