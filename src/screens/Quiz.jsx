import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function Quiz() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { category, difficulty, history, setHistory } = useAppContext();
  const isQuizFinished = currentQuestionIndex === 10;

  async function onRetake() {
    setSelectedAnswer(null);
    setLoading(true);
    await getTriviaData();
    setCurrentQuestionIndex(0);
    setCurrentPoints(0);
    setLoading(false);
  }

  function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [...incorrectAnswers, correctAnswer];
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  async function getTriviaData() {
    setLoading(true);

    const resp = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    setTriviaQuestions(resp.data.results);
    setCorrectAnswer(resp.data.results[0].correct_answer);

    combineAllAnswers(
      resp.data.results[0].incorrect_answers,
      resp.data.results[0].correct_answer
    );

    setLoading(false);
  }

  useEffect(() => {
    getTriviaData();
  }, []);

  function verifyAnswer(selectedAnswer) {
    setSelectedAnswer(selectedAnswer);
    let newScore = currentPoints;
    if (selectedAnswer === correctAnswer) {
      newScore++;
      setCurrentPoints(newScore);
    }
    if (currentQuestionIndex === 9)
      setHistory((history) => [...history, newScore]);
    console.log({ currentQuestionIndex });

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      if (nextQuestionIndex === 10) return;
      setCorrectAnswer(triviaQuestions[nextQuestionIndex].correct_answer);
      combineAllAnswers(
        triviaQuestions[nextQuestionIndex].incorrect_answers,
        triviaQuestions[nextQuestionIndex].correct_answer
      );
      setSelectedAnswer(null);
    }, 1500);
  }
  console.log(history);

  function removeCharacters(question) {
    return question
      .replace(/(&quot\;)/g, '"')
      .replace(/(&rsquo\;)/g, "'")
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, "&");
  }

  if (isQuizFinished)
    return (
      <div className="flex flex-col league-spartan justify-center items-center gap-7 w-full h-full">
        <p className="text-5xl">You got:</p>
        <p className="text-8xl">{currentPoints}/10</p>
        <p className="text-5xl">correct answers.</p>
        <div className="flex flex-row league-spartan gap-11">
          <button
            onClick={onRetake}
            className="lato mt-6 px-6 py-2 text-white text-2xl bg-orange-400 rounded-xl hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Retake Quiz
          </button>
          <Link
            to="/category"
            className="lato mt-6 px-6 py-2 text-white text-2xl bg-orange-400 rounded-xl hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Take Another Quiz
          </Link>
        </div>
        <div className="mt-10 text-2xl">
          Your Past Scores: {history.join(", ")}
        </div>
      </div>
    );

  return (
    <div className="App min-h-screen w-dvw flex items-center justify-center">
      <header className="bg-white rounded-lg shadow-lg p-10 w-full max-w-lg">
        {loading ? (
          <div className="text-center text-xl font-semibold text-gray-700">
            Trivia Question Loading...
          </div>
        ) : (
          <div>
            {currentQuestionIndex < triviaQuestions.length ? (
              <div>
                <div className="text-right text-lg font-semibold text-gray-500 mb-4">
                  {currentQuestionIndex + 1}/{triviaQuestions.length}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-6">
                  Current Points: {currentPoints}
                </div>
                <div className="text-lg font-medium text-gray-700 mb-8">
                  {removeCharacters(
                    triviaQuestions[currentQuestionIndex].question
                  )}
                </div>
                <div className="flex flex-col space-y-4">
                  {allPossibleAnswers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => verifyAnswer(answer)}
                      className={`${
                        selectedAnswer
                          ? answer === correctAnswer
                            ? "bg-green-400"
                            : answer === selectedAnswer
                            ? "bg-red-400"
                            : "bg-blue-200"
                          : "bg-blue-200 hover:bg-blue-300"
                      } text-black font-semibold py-3 px-5 rounded-lg shadow-md transition duration-300 ease-in-out`}
                      disabled={!!selectedAnswer}
                    >
                      {removeCharacters(answer)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Done!</h2>
                <p className="text-lg font-medium text-gray-700 mt-4">
                  You got {currentPoints} out of 10 questions correct.
                </p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Quiz;
