import { gql } from '@apollo/client'

export const UPDATE_CONTACT = gql`
  mutation updateContact($updateContactData:UpdateContactInput!)
  {
        updateContact(
            updateContactData:$updateContactData
        ){
          contactId 
        }
    }
`
