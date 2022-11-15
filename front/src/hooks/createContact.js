import { gql } from '@apollo/client'

export const CREATE_CONTACT = gql`
  mutation createContact($createContactData:CreateContactInput!)
  {
        createContact(
            createContactData:$createContactData
        ){
          contactId
            
        }
    }
`
