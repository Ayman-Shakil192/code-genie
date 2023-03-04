import React, { useEffect, useState } from "react";
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
import Slider from "../Slider";
import "swiper/css";
import "swiper/css/pagination";
import "../Login/Login.css";
import googleIcon from "../../assets/google-icon.svg";
import illustrationOne from "../../assets/illustration1.svg";
import illustrationTwo from "../../assets/illustration2.svg";
import illustrationThree from "../../assets/illustration3.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  SwiperCore.use([Autoplay]);

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-inner">
          <h1>Welcome to Code-Genie</h1>
          <p className="body-text">Sign In to continue</p>

          <button
            className="rounded-button google-login-button"
            onClick={signInWithGoogle}
          >
            <span className="google-icon">
              <img src={googleIcon} alt="google" />
            </span>
            <span>Sign in with google</span>
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

          <button
            className="rounded-button login-cta"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
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
            >
              <SwiperSlide>
                <Slider
                  image={illustrationOne}
                  alt="slider"
                  title="Transform your ideas into code with ease"
                  desc="Simply describe your project specifications in natural language and watch our app turn them into flawless code in a matter of seconds"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Slider
                  image={illustrationTwo}
                  alt="slider"
                  title="Say goodbye to hours of manual coding and hello to seamless automation"
                  desc="Code-Genie takes your project specs and converts them into high-quality code, streamlining your development process"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Slider
                  image={illustrationThree}
                  alt="slider"
                  title="Unleash your creativity and bring your vision to life"
                  desc="With Code-Genie you can focus on conceptualizing your ideas and let our technology handle the rest. Say what you want, get code that works"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
