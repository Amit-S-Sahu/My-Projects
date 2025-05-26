import React from "react";
import "./navbar.scss";
import { motion } from "framer-motion";
import Sidebar from "../sidebar/sidebar";

const Navbar = () => {
  return (
    <div className="navbar">
      <Sidebar />
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="../../logo.png" alt="" />
        </motion.span>
        <div className="social">
          <a href="https://linkedin.com/in/amit-s-sahu/">
            <img src="./linkedin.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/Amit00199">
            <img
              src="./github.png"
              alt="GitHub"
              style={{ transform: "scale(1.8)" }}
            />
          </a>
          <a href="https://www.instagram.com/amitssahu786/">
            <img src="./instagram.png" alt="Instagram" />
          </a>
          <a href="mailto:amitssahu199@gmail.com/">
            <img
              src="./email.png"
              alt="E-Mail"
              style={{ transform: "scale(1.5)" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
