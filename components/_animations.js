export const gridParent = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const gridItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1.2,
    },
  },
};

export const halfSecondStagger = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export const quarterSecondStagger = {
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

export const barReveal = {
  hidden: { left: 0 },
  show: {
    left: "100%",
    transition: {
      duration: 0.5,
    },
  },
};
