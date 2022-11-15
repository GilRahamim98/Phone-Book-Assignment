import { gql } from '@apollo/client'

export const DELETE_CONTACT = gql`
  mutation deleteContact($deleteContactData:DeleteContactInput!)
  {
        deleteContact(
            deleteContactData:$deleteContactData
        ){
            contactId
        }
    }
`
