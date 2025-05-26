import { motion } from "framer-motion";
import "./hero.scss";

const textVariants = {
  initial: {
    x: -500,
    opacity: 1,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 1.8,
      repeat: Infinity,
    },
  },
};

const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const text = [
  "A",
  "s",
  "p",
  "i",
  "r",
  "i",
  "n",
  "g",
  " ",
  "F",
  "u",
  "l",
  "l",
  "-",
  "S",
  "t",
  "a",
  "c",
  "k",
  " ",
  "D",
  "e",
  "v",
  "e",
  "l",
  "o",
  "p",
  "e",
  "r",
  " ",
  "a",
  "n",
  "d",
  " ",
  "M",
  "L",
  " ",
  "E",
  "n",
  "g",
  "i",
  "n",
  "e",
  "e",
  "r",
];

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>AMIT S SAHU</motion.h2>
          <motion.h1 variants={textVariants}>
            {text.map((letter, index) => (
              <motion.span
                key={index}
                whileHover={{
                  color: index === 8 ? "black" : "orange",
                  y: index === 8 ? 0 : -5,
                  transform: "translateY(-35px)",
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div variants={textVariants} className="buttons">
            <motion.button
              variants={textVariants}
              whileHover={{
                backgroundColor: "orange",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <a href="#Portfolio">See the latest Works</a>
            </motion.button>
            <motion.button
              variants={textVariants}
              whileHover={{
                backgroundColor: "orange",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <a href="#Contact">Contact Me</a>
            </motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="./scroll.png"
            alt="Scroll"
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Coding Web Development Machine Learning Competitive Programming
      </motion.div>
      <div className="imageContainer">
        <img src="./hero.png" alt="MyPic" />
      </div>
    </div>
  );
};

export default Hero;
