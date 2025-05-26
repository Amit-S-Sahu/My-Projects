import React, { useRef } from "react";
import "./stack.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Stack = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="stack"
      variants={variants}
      initial="initial"
      animate={isInView && "animate"}
      ref={ref}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          Exploring boundless realms of knowledge
          <br />
          fueled by insatiable curiosity
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="../../../people.webp" alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Tech</motion.b> Stack
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>and ongoing</motion.b>{" "}
            Proficiencies
          </h1>
          <button>WHAT I'VE LEARNT</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          whileHover={{ background: "lightgrey", color: "black" }}
          className="box"
        >
          <h2>Full Stack Development</h2>
          <p>
            A comprehensive suite of technologies enabling end-to-end web
            application development. From frontend elegance with HTML, CSS, and
            ReactJS to robust backend solutions with NodeJS, ExpressJS, Django,
            and database management with MongoDB and MySQL.
          </p>
          {/* <button>Go</button> */}
        </motion.div>
        <motion.div
          whileHover={{ background: "lightgrey", color: "black" }}
          className="box"
        >
          <h2>Languages</h2>
          <p>
            A foundation of versatile programming languages facilitating
            innovation and problem-solving. C, C++, and Python serve as the
            backbone for developing robust software solutions, spanning from
            embedded systems to artificial intelligence applications.
          </p>
          {/* <button>Go</button> */}
        </motion.div>
        <motion.div
          whileHover={{ background: "lightgrey", color: "black" }}
          className="box"
        >
          <h2>Data Science and Machine Learning</h2>
          <p>
            An arsenal of tools empowering data-driven decision-making and
            predictive modeling. Numpy and Pandas facilitate data manipulation
            and analysis, while OpenCV and TensorFlow provide powerful
            frameworks for computer vision and machine learning tasks.
          </p>
          {/* <button>Go</button> */}
        </motion.div>
        <motion.div
          whileHover={{ background: "lightgrey", color: "black" }}
          className="box"
        >
          <h2>Other Tools</h2>
          <p>
            Essential tools enhancing productivity and creativity in software
            development. Git enables efficient version control, while Adobe
            Photoshop and Illustrator offer powerful graphic design
            capabilities, ensuring seamless integration of visual elements into
            digital projects.
          </p>
          {/* <button>Go</button> */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Stack;
