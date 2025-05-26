import { motion } from "framer-motion";
import homepageImage from "../../../../public/home.png";
import aboutImage from "../../../../public/info.png";
import techStackImage from "../../../../public/stack.png";
import portfolioImage from "../../../../public/project.png";
import contactImage from "../../../../public/contact.png";

const Links = () => {
  const variants = {
    open: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: 50,
      opacity: 0,
    },
  };

  const items = [
    { name: "Homepage", image: homepageImage },
    { name: "About", image: aboutImage },
    { name: "Tech-Stack", image: techStackImage },
    { name: "Portfolio", image: portfolioImage },
    { name: "Contact", image: contactImage },
  ];

  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <motion.a
          href={`#${item.name}`}
          key={item.name}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={item.image} alt={item.name} />
          <span className="text">{item.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Links;
