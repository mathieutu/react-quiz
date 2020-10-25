import { gql } from '@apollo/client'

export const NEW_USER_QUERY = gql`
    mutation AddUser($email: String, $name: String) {
        addUser(
            object: {email: $email, name: $name},
            on_conflict: {constraint: users_email_key, update_columns: name}
        ) {
            id
            email
            name
        }
    }
`

export const NEW_ANSWER_QUERY = gql`
    mutation AddAnswer($answer: String, $questionId: String, $userId: uuid) {
        addAnswer(
            object: {answer: $answer, question_id: $questionId, user_id: $userId},
            on_conflict: {constraint: answers_user_id_question_id_key, update_columns: answer}
        ) {
            id
            question_id
            answer
            user_id
        }
    }
`
