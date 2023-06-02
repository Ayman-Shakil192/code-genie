import React from "react";
import { motion } from "framer-motion";
import {
  statisticTitleAnimate,
  statisticSubtitleAnimate,
  cardAnimate,
  barAnimate,
} from "../../Animations";
import featureData from "./featureData";
import "./Features.css";

const Statistic = () => {
  return (
    <section className="statistic-container">
      <motion.div
        className="feature-title"
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        variants={statisticTitleAnimate}
      >
        Key Features
      </motion.div>
      <motion.div
        className="subtitle"
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        variants={statisticSubtitleAnimate}
      >
        {" "}
        Learn about the Powerful Features That Set Our Text-to-Code Conversion
        Platform Apart
      </motion.div>
      <div className="flex-container">
        {" "}
        {featureData.map((item, index) => {
          const { id, image, title, subtitle } = item;
          return (
            <React.Fragment key={id}>
              <motion.div
                className="statistic"
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                variants={cardAnimate}
              >
                {" "}
                <div className="icon-container">
                  <img src={image} alt="statistic" className="icon" />
                </div>
                <div className="statistic-title">{title}</div>
                <div className="statistic-subtitle">{subtitle}</div>
              </motion.div>
              {index !== featureData.length - 1 && (
                <motion.div
                  className="bar"
                  key={`bar-${id}`}
                  initial={"offscreen"}
                  whileInView={"onscreen"}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  variants={barAnimate}
                ></motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default Statistic;
