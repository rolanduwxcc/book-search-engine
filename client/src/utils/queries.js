import gql from 'graphql-tag';

//GET_ME to execute the me query
export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                _id
                bookId
                authors
                title
                description
                link
                image
            }
        }
    }
`;