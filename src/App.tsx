import React, {useState} from 'react';
import './assets/css/App.css';
import {QCM} from "./Data";
import DisplayQuestion from "./component/DisplayQuestion";

function App() {
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0);

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
  return (
    <div className="container flex min-h-screen mx-auto bg-gray-200 h-full">
      <div>
          {QCM[currentQuestionIndex] !== undefined ? (
              <DisplayQuestion question={QCM[currentQuestionIndex]} handleNext={handleNext}/>
          ) : ('fini')}
      </div>
    </div>
  );
}

export default App;
