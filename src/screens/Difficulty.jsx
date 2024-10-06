import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Difficulty = () => {
  const { setDifficulty } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="league-spartan m-10 text-3xl md:text-5xl font-bold mb-[4rem]">
        Choose one of the difficulties below:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 cursor-pointer">
        {["easy", "medium", "hard"].map((difficulty) => (
          <Link
            key={difficulty}
            onClick={() => setDifficulty(difficulty)}
            to="/quiz"
            replace
          >
            <div className="p-14 md:p-20 bg-blue-200 rounded-lg shadow-md text-center hover:bg-blue-300 transition-colors">
              <h2 className="text-5xl font-bold capitalize text-white">
                {difficulty}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Difficulty;
