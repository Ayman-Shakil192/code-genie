/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination } from "swiper";
import Slider from "./Slider";
import SliderData from "../../constants/SliderData";
import "swiper/css";
import "swiper/css/pagination";
import "./Login.css";
import googleIcon from "../../assets/icons/google-icon.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const handleLogin = () => {
    setLoggingIn(true);
    logInWithEmailAndPassword(email, password)
      .then(() => {
        setLoggingIn(false);
        navigate("/dashboard");
      })
      .catch(() => setLoggingIn(false));
  };

  SwiperCore.use([Autoplay]);

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-inner">
          <div className="sign-in-text">Sign In</div>
          <button
            className="rounded-button google-login-button"
            onClick={signInWithGoogle}
          >
            <span className="google-icon">
              <img src={googleIcon} alt="google" />
            </span>
            <span className="google-signin">Sign in with google</span>
          </button>

          <div className="sign-in-seperator">
            <span>or Sign in with Email</span>
          </div>

          <div className="login-form-group">
            <label for="email">
              Email <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
          </div>
          <div className="login-form-group">
            <label for="pwd">
              Password <span className="required-star">*</span>
            </label>
            <input
              autoComplete="off"
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="login-form-group single-row">
            <div className="custom-check">
              <input autocomplete="off" type="checkbox" id="remember" />
              <label for="remember">Remember me</label>
            </div>

            <Link to="/reset" className="link forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button className="rounded-button login-cta" onClick={handleLogin}>
            {loggingIn ? "Logging in..." : "Login"}
          </button>

          <div className="register-div">
            New to Code-Genie?{" "}
            <Link to="/register" className="link create-account">
              Register Now
            </Link>
          </div>
        </div>
      </div>

      <div className="onboarding">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <Swiper
              pagination={true}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              style={{
                marginBottom: "10px",
              }}
            >
              {SliderData.map((item, index) => (
                <SwiperSlide key={index}>
                  <Slider
                    image={item.image}
                    alt={item.alt}
                    title={item.title}
                    desc={item.desc}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
