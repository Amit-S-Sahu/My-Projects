import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const items = [
  {
    id: 1,
    title: "Project 1",
    img: "https://via.placeholder.com/150",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a sint modi consectetur non eligendi saepe. Ullam eos voluptate laboriosam deserunt deleniti, quasi ad, molestias asperiores provident repellendus repellat quos?",
  },
  {
    id: 2,
    title: "Project 2",
    img: "https://via.placeholder.com/150",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a sint modi consectetur non eligendi saepe. Ullam eos voluptate laboriosam deserunt deleniti, quasi ad, molestias asperiores provident repellendus repellat quos?",
  },
  {
    id: 3,
    title: "Project 3",
    img: "https://via.placeholder.com/150",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a sint modi consectetur non eligendi saepe. Ullam eos voluptate laboriosam deserunt deleniti, quasi ad, molestias asperiores provident repellendus repellat quos?",
  },
  {
    id: 4,
    title: "Project 4",
    img: "https://via.placeholder.com/150",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a sint modi consectetur non eligendi saepe. Ullam eos voluptate laboriosam deserunt deleniti, quasi ad, molestias asperiores provident repellendus repellat quos?",
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button>See more</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div
          style={{ scaleX: scaleX }}
          className="progressBar"
        ></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
