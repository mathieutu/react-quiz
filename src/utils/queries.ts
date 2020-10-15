import {gql} from "@apollo/client";

export const newUserQuery = () => {
    return gql`
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
    `;
};