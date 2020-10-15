import React, {useState} from 'react';
import './assets/css/App.css';
import {QCM} from "./Data";
import DisplayQuestion from "./component/DisplayQuestion";
import {Response} from "./type/Response";
import Header from "./component/Header";

function App() {
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0);

    const handleNext = (response:Response) => {
        //TODO : request API send
        console.log(response);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

  return (
      <div>
          <Header/>
          <div className="container shadow-lg flex min-h-screen mx-auto bg-white h-full">
              <div className="m-10 w-full">
                  <div className="text-right italic text-lg">Question {currentQuestionIndex + 1}/{QCM.length}</div>
                  {QCM[currentQuestionIndex] !== undefined ? (
                      <DisplayQuestion question={QCM[currentQuestionIndex]} handleNext={handleNext}/>
                  ) : ('fini')}
              </div>
          </div>
      </div>
  );
}

export default App;
