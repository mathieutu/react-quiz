import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  GetAnswerDocument,
  useAddAnswerMutation,
  useFinishQuizMutation,
  useGetAnswerLazyQuery,
  useInsertUserMutation,
} from './codegen'
import { useUser } from '../context/UserContext'
import { useQuiz } from '../context/QuizContext'
import { formatISO } from '../utils/dates'

export const useCurrentAnswers = () => {
  const [fetchAnswers, { data, loading: fetchLoading }] = useGetAnswerLazyQuery()
  const [addAnswer, { loading: submitLoading }] = useAddAnswerMutation()
  const { user } = useUser()
  const { currentQuestion } = useQuiz()

  const [answers, setAnswers] = useState<string[]>([])
  const [initialAnswers, setInitialAnswers] = useState<string[]>([])

  const variables = useMemo(() => ({
    questionId: currentQuestion.id,
    userId: user.id,
  }), [currentQuestion.id, user.id])

  useEffect(() => {
    fetchAnswers({ variables })
  }, [fetchAnswers, variables])

  useEffect(() => {
    const fetchedAnswers = data?.answers[0]?.answers ?? []

    setInitialAnswers(fetchedAnswers)
    setAnswers(fetchedAnswers)
  }, [data?.answers])

  const submitAnswers = async () => {
    const answersHaventChanged = answers.length === initialAnswers.length
      && answers.every((value, index) => initialAnswers[index] === value)

    if (answersHaventChanged) {
      return
    }

    await addAnswer({
      variables: { ...variables, answers },
      update(cache, { data: newData }) {
        cache.writeQuery({
          query: GetAnswerDocument,
          variables,
          data: newData?.addAnswer,
        })
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

export const useFinishQuiz = () => {
  const { user } = useUser()
  const [mutation, { loading, error }] = useFinishQuizMutation()

  const finishQuiz = useCallback(() => mutation({
    variables: {
      id: user.id,
      finishedAt: formatISO(new Date()),
    },
  }), [mutation, user.id])

  return { finishQuiz, loading, error }
}
