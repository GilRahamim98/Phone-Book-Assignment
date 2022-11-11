import React from 'react'
import './ContactInList.css'

function ContactInList(contact) {

    return (
        <div >{contact.nickname ? <h1>{contact.nickname}</h1> : <div><h1>{contact.first_name} {contact.last_name} <img className="contact_photo" src={contact.photo} alt={contact.first_name} style={{ display: "inline-block" }} ></img></h1> </div>}</div >
    )
}

export default ContactInList