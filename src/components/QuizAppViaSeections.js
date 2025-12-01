import React, { useState, useEffect } from "react";
import { ChevronRight, CheckCircle } from "lucide-react";
import axios from "axios";
import paper from "./evs.json";
import {submitEndpoint} from '../contants';
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const originalQuestions = [];
paper.sections.forEach((sec) => {
  sec.questions.forEach((each) => {
    originalQuestions.push({
      ...each,
      type: "multiple",
      heading: each.heading || sec.heading,
      section: sec.section,
    });
  });
});

// const Navbar = () => (
//   <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
//     <Link to="/login" style={{ margin: '10px' }}>Login</Link>
//   </nav>
// );
function shuffleArray(array) {
  const copied = [...array]; // important: don't mutate original array
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  console.log(copied)
  return copied;
}



export default function QuizApp() {
  const savedCurrent = localStorage.getItem("currentQuestion");
  const savedAnswers = localStorage.getItem("answers");
  const savedComplete = localStorage.getItem("isComplete");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(
    savedCurrent ? parseInt(savedCurrent) : 0
  );

  const [answers, setAnswers] = useState(
    savedAnswers ? JSON.parse(savedAnswers) : {}
  );

  const [isComplete, setIsComplete] = useState(savedComplete === "true");
  const [submitEnable, setSubmitEnable] = useState(false);

  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [answers, setAnswers] = useState({});
  // const [isComplete, setIsComplete] = useState(false);
  console.log(paper.sections);

  useEffect(() => {
    // shuffle only once when student logs in
    const randomQuestions = shuffleArray(originalQuestions);
    setQuestions(randomQuestions);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
  }, [currentQuestion]);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("isComplete", isComplete);
  }, [isComplete]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = (subBtn) => {
    console.log("handleNext called", currentQuestion, questions.length);
    if(currentQuestion === questions.length -2){
      setSubmitEnable(true)
    }
    console.log("Next clicked");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      if(subBtn){setIsComplete(true);}
    }
    console.log(answers);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      student_id: localStorage.getItem("user"), // optional
      ...answers,
      // merge dynamic answers
    };
    console.log(answers)
    await axios.post(submitEndpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      console.log("Submission Response:", res.data);
      alert("Exam submitted successfully!");
      localStorage.clear();
      setIsComplete(true);
      setAnswers({});
      setCurrentQuestion(0);
       navigate("/");
    }).catch(err => {
      console.error("Submission Error:", err);
      alert("Error submitting exam. Please try again.");
    });
  };

  const attemptedCount = Object.keys(answers).filter(
    (key) => answers[key] !== ""
  ).length;
  const remainingCount = questions.length - attemptedCount;
  if(questions.length === 0) {
    return <div>Loading Questions...</div>;
  }
  if (isComplete) {
    return (
      <>
        <div className="bg-gradient-to-br flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Exam Completed!
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Thank you for completing the quiz. Here's your summary:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {attemptedCount}
                </div>
                <div className="text-gray-700 font-medium">
                  Questions Attempted
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {remainingCount}
                </div>
                <div className="text-gray-700 font-medium">
                  Questions Skipped
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="mr-8 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Submit Exam !
            </button>
            {/* <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setIsComplete(false);
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start New Quiz
          </button> */}
          </div>
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id] || "";

  return (
    <>
      <div className="flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-sm md:text-base text-gray-600">
              <span className="font-semibold text-indigo-600">
                {attemptedCount}
              </span>{" "}
              Attempted
            </div>
            <div className="text-sm md:text-base font-bold text-gray-800">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="text-sm md:text-base text-gray-600">
              <span className="font-semibold text-orange-600">
                {remainingCount}
              </span>{" "}
              Remaining
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 h-2">
          <div
            className="bg-indigo-600 h-2 transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="fixed top-10 right-4"> <Timer minutes={90} submit={setIsComplete}/></div>
        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-3xl w-full">
            <h3 className="text-xl  font-bold text-gray-800 mb-2">
              {question.heading ? question.heading : ""}
            </h3>
            <p className="text-gray-600 mb-2">{question.paragraph}</p>
            <h4 className="text-xl  font-bold text-gray-800 mb-4">
               {question.question}
            </h4>
            {question.image ? <img src={question.image} alt="" className="mb-4 max-h-60 object-contain"/>: ""}
            {question.type === "multiple" ? (
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <label
                    key={"question"+idx}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      currentAnswer === option
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={currentAnswer === option}
                      onChange={(e) =>
                        handleAnswer(question.id, e.target.value)
                      }
                      className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none text-gray-700 font-medium transition-colors duration-200"
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 gap-4 fixed right-4 bottom-[230px] bg-white p-4 rounded-xl shadow-lg w-[300px]">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  currentQuestion === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md hover:shadow-lg"
                }`}
              >
                Previous
              </button>

              <button
                onClick={()=>handleNext(false)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                { "Next "}
                <ChevronRight className="w-5 h-5" />
              </button>
              
            </div>
             {submitEnable ? <div className="flex justify-between mt-8 gap-4 fixed right-4 bottom-[120px] bg-white p-4 rounded-xl shadow-lg w-[300px] center">
              
              <button
                onClick={()=>handleNext(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl m-auto"
              >
                {"Submit " }
               !
              </button>
            </div>: ""}
          </div>
        </div>
      </div>
    </>
  );
}
