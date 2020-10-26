import React from 'react'
import { useQuiz } from '../context/QuizContext'
import { formatDurationFromSecToHuman } from '../utils/dates'
import { DURATION } from '../configuration'
import mayTheForce from '../assets/may-the-force.gif'

export const HomePage = () => {
  const { startQuiz, questionsQuantity } = useQuiz()

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
            Déroulé du test
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <span className="ml-3 shadow-sm rounded-md">
            <button
              type="button"
              onClick={startQuiz}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Commencer
            </button>
          </span>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-8">
              <p>
                <strong>Attention</strong>, prenez connaissance des règles ci-dessous avant de commencer le
                questionnaire :
              </p>
              <ul className="space-y-3 list-disc list-outside mt-3 ml-10">
                <li>
                  Le QCM comporte <strong>{questionsQuantity} questions</strong>.
                </li>
                <li>
                  Vous avez <strong>{formatDurationFromSecToHuman(DURATION)}</strong> pour le terminer,
                  ce qui fait environ {formatDurationFromSecToHuman(DURATION / questionsQuantity)} par question. <br />
                  Au bout de ce temps, vous ne pourrez plus y accéder. Pensez-donc à jeter un coup d'œil au temps
                  régulièrement.
                </li>
                <li>
                  Certaines questions attendent <strong>plusieurs réponses</strong>. <br />
                  Certaines n'en attendent qu'une seule. <br />
                  Il est possible que l'énoncé de la question vous l'indique, mais ce n'est pas obligé. <br />
                  Vous devez donner <strong>toutes</strong> les bonnes réponses, mais <strong>uniquement</strong> les bonnes réponses pour valider la question.
                </li>
                <li>
                  Dès lors que vous avez choisi votre ou vos réponses pour la question en cours, cliquez sur le bouton
                  "Question suivante" pour sauvegarder votre choix.
                </li>
                <li>
                  Enfin, de la même manière qu'un‧e bon‧ne développeu‧r‧se, doit prendre le temps de lire la documentation
                  pour être efficace, pensez à bien lire les énoncés. Il peut y avoir des subtilités !
                </li>
              </ul>
              <p className="mt-10">Bon test à tou‧te‧s !</p>

              <img className="h-56 mx-auto mt-5 rounded-lg" src={mayTheForce} alt="May the force be with you" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
