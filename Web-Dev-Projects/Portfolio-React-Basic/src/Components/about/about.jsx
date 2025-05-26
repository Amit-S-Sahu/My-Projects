import "./about.scss";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faHtml5,
  faCss3,
  faGitAlt,
  faJsSquare,
  faSass,
} from "@fortawesome/free-brands-svg-icons";

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

const About = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });
  return (
    <div className="about aboutContainer">
      <motion.div
        className="textContainer"
        variants={variants}
        initial="initial"
        animate={isInView && "animate"}
        ref={ref}
      >
        <motion.h1 whileHover={{ color: "orange" }}>About Me</motion.h1>
        <motion.p className="p1" whileHover={{ scale: 1.1 }}>
          Excited first-year B.Tech Computer Science student at UPES, Dehradun,
          here! I'm absolutely hooked on the magic of machine learning,
          artificial intelligence, and web development. You'll often find me
          buzzing with curiosity, eager to explore how AI can tackle real-life
          puzzles and make a difference, while also diving into the world of web
          development to create intuitive and impactful digital experiences. I
          thrive on teamwork and love bouncing ideas around with my peers.
        </motion.p>
        <br />
        <motion.p className="p2" whileHover={{ scale: 1.1 }}>
          But hey, I'm not all about the tech stuff! I'm also a big dreamer when
          it comes to the cosmos. There's something about gazing up at the stars
          that just fills me with wonder. And when I'm not lost in the stars,
          you might catch me buried in a good book or strumming away on my
          guitar. Life's all about learning, that's why I'm constantly diving
          into new technologies and soaking up knowledge like a sponge.
        </motion.p>
        <br />
        <motion.p className="p3" whileHover={{ scale: 1.1 }}>
          So, if you ever want to chat about AI, web development, the universe,
          or anything in between, I'm your person! Let's make some magic happen
          together.
        </motion.p>
      </motion.div>
      <div className="cubeContainer">
        <div className="cubeSpinner">
          <div className="face1">
            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
          </div>
          <div className="face2">
            <FontAwesomeIcon icon={faHtml5} color="#F06529" />
          </div>
          <div className="face3">
            <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
          </div>
          <div className="face4">
            <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
          </div>
          <div className="face5">
            <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
          </div>
          <div className="face6">
            <FontAwesomeIcon icon={faSass} color="#cc6699" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
