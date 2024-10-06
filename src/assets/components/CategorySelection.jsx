import React, { useState } from "react";

const categories = {
  Sports: 21,
  History: 23,
  Geography: 22,
  "Video Games": 15,
};

const difficulties = ["Easy", "Medium", "Hard"];

const CategorySelection = ({ onStartQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const startQuiz = () => {
    if (selectedCategory && selectedDifficulty) {
      onStartQuiz(selectedCategory, selectedDifficulty);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">
        Choose a Category and Difficulty:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`p-6 rounded-lg shadow-md text-center transition-colors ${
              selectedCategory === category
                ? "bg-blue-300"
                : "bg-blue-100 hover:bg-blue-200"
            }`}
          >
            <h2 className="text-xl font-semibold">{category}</h2>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
            className={`p-4 rounded-lg shadow-md text-center transition-colors ${
              selectedDifficulty === difficulty
                ? "bg-green-300"
                : "bg-green-100 hover:bg-green-200"
            }`}
          >
            <h2 className="text-lg font-medium">{difficulty}</h2>
          </button>
        ))}
      </div>
      <button
        onClick={startQuiz}
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default CategorySelection;
