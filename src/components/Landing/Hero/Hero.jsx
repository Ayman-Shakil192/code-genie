import { useState } from "react";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import "./Hero.css";
import {
  itemVariants,
  menuVariants,
  transition,
  imageAnimate,
  heroTitleAnimate,
  heroSubtitleAnimate,
  btnAnimate,
} from "../../Animations";
import heroIllustration from "../../../assets/illustrations/hero-illustration.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleNav = () => setOpen(!isOpen);

  return (
    <section className="hero">
      <motion.div className="nav">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 1.5 },
          }}
        >
          CodeGenie
        </motion.h1>

        <motion.div
          className="nav-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 1.5 },
          }}
        >
          {["Features", "Pricing", "Resources"].map((label) => (
            <div key={label}>{label}</div>
          ))}
        </motion.div>

        <motion.div
          className="nav-right"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 1.5 },
          }}
        >
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
          <button className="sign-up">
            <Link to={"/register"}>Sign Up</Link>
          </button>
        </motion.div>

        <motion.div
          className="menu-icon"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 1.5 },
          }}
        >
          <Hamburger
            toggled={isOpen}
            toggle={toggleNav}
            color="hsl(257, 7%, 63%)"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="nav-links"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        {["Features", "Pricing", "Resources"].map((label) => (
          <motion.a
            key={label}
            variants={itemVariants}
            href={`#${label.toLowerCase()}`}
            whileHover={{ scale: 1.2, cursor: "pointer" }}
            transition={transition}
          >
            {label}
          </motion.a>
        ))}
        <div className="hr"></div>
        <motion.a
          variants={itemVariants}
          href="#login"
          whileHover={{ scale: 1.2, cursor: "pointer" }}
          transition={transition}
        >
          <Link to={"/login"}>Login</Link>
        </motion.a>
        <motion.button
          variants={itemVariants}
          className="sign-up"
          whileHover={{ scale: 1.1, cursor: "pointer" }}
          transition={transition}
        >
          <Link to={"/register"}>Sign Up</Link>
        </motion.button>
      </motion.div>

      <div className="hero-content-container">
        <div className="hero-content">
          <motion.div
            className="hero-title"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            variants={heroTitleAnimate}
          >
            Simplify code generation through Natural Language
          </motion.div>
          <motion.div
            className="hero-subtitle"
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            variants={heroSubtitleAnimate}
          >
            Streamline the coding process by writing your queries in natural
            language and converting it into a syntax that works for you
          </motion.div>
          <Link to="/login">
            <motion.button
              className="get-started"
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              variants={btnAnimate}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
        <div className="illustration">
          <motion.img
            className="working-illustration"
            src={heroIllustration}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            variants={imageAnimate}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
