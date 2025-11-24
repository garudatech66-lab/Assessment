import React, { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import axios from "axios";


// Sample 50 questions - mix of multiple choice and text input
const questions = [
  { id: 1, type: 'multiple', question: 'What is the capital of France?', options: ['A. London', 'B. Paris', 'C. Berlin', 'D. Madrid'] },
  { id: 2, type: 'text', question: 'What is 15 + 27?' },
  { id: 3, type: 'multiple', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'] },
  { id: 4, type: 'multiple', question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'] },
  { id: 5, type: 'text', question: 'Name the largest ocean on Earth.' },
  { id: 6, type: 'multiple', question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'] },
  { id: 7, type: 'multiple', question: 'How many continents are there?', options: ['5', '6', '7', '8'] },
  { id: 8, type: 'text', question: 'What year did World War II end?' },
  { id: 9, type: 'multiple', question: 'What is the smallest prime number?', options: ['0', '1', '2', '3'] },
  { id: 10, type: 'multiple', question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'] },
  { id: 11, type: 'text', question: 'Name the author of "Harry Potter" series.' },
  { id: 12, type: 'multiple', question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'] },
  { id: 13, type: 'multiple', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'] },
  { id: 14, type: 'text', question: 'What is the speed of light in vacuum? (approx in km/s)' },
  { id: 15, type: 'multiple', question: 'Which vitamin is produced when skin is exposed to sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'] },
  { id: 16, type: 'multiple', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'] },
  { id: 17, type: 'text', question: 'Name the longest river in the world.' },
  { id: 18, type: 'multiple', question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'] },
  { id: 19, type: 'multiple', question: 'What is the largest mammal in the world?', options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'] },
  { id: 20, type: 'text', question: 'What is the boiling point of water in Celsius?' },
  { id: 21, type: 'multiple', question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'] },
  { id: 22, type: 'multiple', question: 'What is the currency of the United Kingdom?', options: ['Euro', 'Dollar', 'Pound Sterling', 'Franc'] },
  { id: 23, type: 'text', question: 'Name the process by which plants make their food.' },
  { id: 24, type: 'multiple', question: 'Which element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'] },
  { id: 25, type: 'multiple', question: 'What is the tallest mountain in the world?', options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'] },
  { id: 26, type: 'text', question: 'What is the square root of 144?' },
  { id: 27, type: 'multiple', question: 'Which country is home to the kangaroo?', options: ['New Zealand', 'Australia', 'South Africa', 'Brazil'] },
  { id: 28, type: 'multiple', question: 'How many hours are in a day?', options: ['12', '24', '36', '48'] },
  { id: 29, type: 'text', question: 'Name the first President of the United States.' },
  { id: 30, type: 'multiple', question: 'What is the freezing point of water in Celsius?', options: ['-10', '0', '10', '32'] },
  { id: 31, type: 'multiple', question: 'Which organ pumps blood through the human body?', options: ['Liver', 'Kidney', 'Heart', 'Lungs'] },
  { id: 32, type: 'text', question: 'What does DNA stand for?' },
  { id: 33, type: 'multiple', question: 'How many colors are in a rainbow?', options: ['5', '6', '7', '8'] },
  { id: 34, type: 'multiple', question: 'What is the capital of Italy?', options: ['Venice', 'Milan', 'Rome', 'Florence'] },
  { id: 35, type: 'text', question: 'Name the largest planet in our solar system.' },
  { id: 36, type: 'multiple', question: 'Which animal is known as the "King of the Jungle"?', options: ['Tiger', 'Lion', 'Elephant', 'Leopard'] },
  { id: 37, type: 'multiple', question: 'How many degrees are in a right angle?', options: ['45', '60', '90', '180'] },
  { id: 38, type: 'text', question: 'What is the primary language spoken in Brazil?' },
  { id: 39, type: 'multiple', question: 'Which is the smallest continent by land area?', options: ['Europe', 'Australia', 'Antarctica', 'South America'] },
  { id: 40, type: 'multiple', question: 'What is the main ingredient in guacamole?', options: ['Tomato', 'Avocado', 'Pepper', 'Onion'] },
  { id: 41, type: 'text', question: 'Name the process of water turning into vapor.' },
  { id: 42, type: 'multiple', question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'] },
  { id: 43, type: 'multiple', question: 'What is the largest desert in the world?', options: ['Sahara', 'Arabian', 'Gobi', 'Antarctic'] },
  { id: 44, type: 'text', question: 'What is 7 x 8?' },
  { id: 45, type: 'multiple', question: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'] },
  { id: 46, type: 'multiple', question: 'What is the study of earthquakes called?', options: ['Meteorology', 'Seismology', 'Geology', 'Oceanography'] },
  { id: 47, type: 'text', question: 'Name the currency used in Japan.' },
  { id: 48, type: 'multiple', question: 'How many minutes are in an hour?', options: ['30', '45', '60', '90'] },
  { id: 49, type: 'multiple', question: 'Which Shakespeare play features the character Hamlet?', options: ['Macbeth', 'Othello', 'Hamlet', 'King Lear'] },
  { id: 50, type: 'text', question: 'What is the capital of Canada?' }
];

// const Navbar = () => (
//   <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
//     <Link to="/login" style={{ margin: '10px' }}>Login</Link>
//   </nav>
// );


export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
    console.log(answers)
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

   const handleSubmit = async () => {
      const payload = {
        student_id: "studentId",  // optional
        ...answers              // merge dynamic answers
      };

      const res = await axios.post("http://localhost:5000/submit", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }


  const attemptedCount = Object.keys(answers).filter(key => answers[key] !== '').length;
  const remainingCount = questions.length - attemptedCount;

  if (isComplete) {
    return (<>
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
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setIsComplete(false);
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start New Quiz
          </button>
        </div>
      </div>
      </>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id] || '';

  return (
    <>
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-sm md:text-base text-gray-600">
            <span className="font-semibold text-indigo-600">{attemptedCount}</span> Attempted
          </div>
          <div className="text-sm md:text-base font-bold text-gray-800">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="text-sm md:text-base text-gray-600">
            <span className="font-semibold text-orange-600">{remainingCount}</span> Remaining
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div
          className="bg-indigo-600 h-2 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-3xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {question.question}
          </h2>

          {question.type === 'multiple' ? (
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    currentAnswer === option
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{option}</span>
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
          <div className="flex justify-between mt-8 gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md hover:shadow-lg'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}