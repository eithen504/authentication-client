import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 shadow-xl rounded-2xl p-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">
          Welcome to our app 👋
        </h1>
        <p className="text-gray-300 text-lg">
          We're glad to have you here.
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
