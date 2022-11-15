import { useQuery, gql } from '@apollo/client'

const GET_SEARCH_CONTACTS = gql`
    query search($searchValue:String!){
        search(searchValue:$searchValue){
            contactId
            firstName
            lastName
            nickname
            phoneNumbers
            address
            photo
        }    
    }
`
export const useSearch = (searchVal) => {
    const { error, data, loading } = useQuery(GET_SEARCH_CONTACTS, {
        variables: {
            searchValue: searchVal
        }
    });

    return {
        error,
        data,
        loading
    }

}