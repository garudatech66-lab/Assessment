import Header from "./header";
import RouterMap from './Routes';

import { Outlet, Link } from "react-router-dom";
export default function QuizApp() {

  return (
    <>
    <Header />
    <div className="flex flex-col">
      {/* <nav>
        <Link to="/">login</Link> | <Link to="/quiz">Quiz</Link>
      </nav> */}

      <RouterMap />

      {/* Footer */}
      <div className="bg-white shadow-md mt-auto fixed bottom-0 w-full">
        <div className="max-w-4xl mx-auto px-4 py-3 text-center text-sm text-gray-500">
          Navigate through questions at your own pace. Your answers are automatically saved.
        </div>
      </div>
    </div>
    </>
  );
}