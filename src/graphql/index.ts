import { useEffect, useState } from 'react'
import { useAddAnswerMutation, useGetAnswerLazyQuery, useInsertUserMutation } from './codegen'
import { useUser } from '../context/UserContext'
import { useQuiz } from '../context/QuizContext'

export const useCurrentAnswers = () => {
  const [fetchAnswers, { data, loading: fetchLoading }] = useGetAnswerLazyQuery()
  const [addAnswer, { loading: submitLoading }] = useAddAnswerMutation()
  const { user } = useUser()
  const { currentQuestion } = useQuiz()

  const [answers, setAnswers] = useState<string[]>([])
  const [initialAnswers, setInitialAnswers] = useState<string[]>([])

  useEffect(() => {
    fetchAnswers({
      variables: {
        questionId: currentQuestion.id,
        userId: user!.id,
      },
    })
  }, [currentQuestion.id, fetchAnswers, user])

  useEffect(() => {
    setAnswers(data?.answers[0]?.answers ?? [])
    setInitialAnswers(data?.answers[0]?.answers ?? [])
  }, [data?.answers])

  const submitAnswers = async () => {
    if (answers.length === initialAnswers.length && answers.every((value, index) => initialAnswers[index] === value)) {
      return
    }

    await addAnswer({
      variables: {
        questionId: currentQuestion.id,
        userId: user!.id,
        answers,
      },
    })
  }

  return { answers, setAnswers, fetchLoading, submitLoading, submitAnswers }
}

export const useInsertUser = () => {
  const [mutation, { loading }] = useInsertUserMutation()

  const insertUser = (user: { email: string, name: string }) => mutation({ variables: user })

  return { insertUser, loading }
}
