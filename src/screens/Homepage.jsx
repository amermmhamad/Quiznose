import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="p-10 rounded-lg text-center">
        <h1 className="league-spartan mb-3 font-bold leading-none tracking-tight text-8xl text-gray-900 lg:text-9xl dark:text-white">
          Quiznose
        </h1>
        <Link to="/category">
          <button className="lato mt-6 px-6 py-2 text-white text-2xl bg-orange-400 rounded-xl hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Let's Go
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
