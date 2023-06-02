export const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const menuVariants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

export const transition = {
  duration: 0.3,
  type: "spring",
  stiffness: 300,
  damping: 20,
};

export const heroTitleAnimate = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const heroSubtitleAnimate = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const imageAnimate = {
  offscreen: {
    x: 100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const btnAnimate = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const resultAnimation = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5 },
  },
};

export const cardAnimate = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const statisticTitleAnimate = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const statisticSubtitleAnimate = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const barAnimate = {
  offscreen: {
    x: 100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const boostTitleAnimation = {
  offscreen: {
    opacity: 0,
    x: 100,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5 },
  },
};

export const boostBtnAnimation = {
  offscreen: {
    opacity: 0,
    x: -100,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5 },
  },
};

export const footerAnimate = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2.5,
    },
  },
};

export const footerTransition = {
  duration: 0.3,
  type: "spring",
  stiffness: 300,
  damping: 20,
};
