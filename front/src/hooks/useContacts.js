import { useQuery, gql } from '@apollo/client'

const GET_CONTACTS = gql`
    query{
        contacts{
            contactId
            firstName
            lastName
            nickname
            photo
            
          }
    }
`
export const useContacts = () => {
    const { error, data, loading } = useQuery(GET_CONTACTS);

    return {
        error,
        data,
        loading
    }

}