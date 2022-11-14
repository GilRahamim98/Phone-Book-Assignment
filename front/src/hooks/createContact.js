import { gql } from '@apollo/client'
export const CREATE_CONTACT = gql`
  mutation createContact(
    $firstName:String!,
    $lastName:String!,
    $nickname:String!,
    $phoneNumbers:[String!]!,
    $address:String!,
    $photo:String!){
        createContact(
            firstName: $firstName,
            lastName: $lastName,
            nickname: $nickname,
            phoneNumbers: $phoneNumbers,
            address: $address,
            photo: $photo
        ){
            contactId
        }

    }
`
