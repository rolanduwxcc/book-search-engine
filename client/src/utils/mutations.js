import gql from 'graphql-tag';

//LOGIN_USER to execute the loginUser
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;


//ADD_USER to execute the addUser
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// //SAVE_BOOK to execute the saveBook
// export const SAVE_BOOK = gql``;

// //REMOVE_BOOK to execute the removeBook
// export const REMOVE_BOOK = gql``;