import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const categories = [
  { key: "Sports", id: 21 },
  { key: "History", id: 23 },
  { key: "Video Games", id: 15 },
  { key: "Geography", id: 22 },
];

const Category = () => {
  const { setCategory } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="league-spartan m-10 text-3xl md:text-5xl font-bold mb-[4rem]">
        Choose one of the categories below:
      </h1>
      <div className="league-spartan grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            onClick={() => setCategory(category.id)}
            to="/difficulty"
            replace
          >
            <div className="flex flex-col items-center justify-center p-3 mr-5 ml-5 md:p-6 bg-blue-100 rounded-lg shadow-md text-center hover:bg-blue-200 transition-colors cursor-pointer">
              <img
                src={`${category.key}.png`}
                className="size-20 md:size-40 object-contain"
              />
              <h2 className="text-3xl font-semibold mt-5 mb-2">
                {category.key}
              </h2>
              <p className="text-gray-700 lato italic">
                Test your knowledge about different {category.key.toLowerCase()}
                -themed questions
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
