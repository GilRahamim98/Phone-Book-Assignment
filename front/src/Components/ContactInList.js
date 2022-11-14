import React, { useState } from 'react'
import './ContactInList.css'
import Modal from 'react-bootstrap/Modal';


function ContactInList(contact) {
    const [showEditForm, setShowEditForm] = useState(false);




    const handleCloseEditForm = () => setShowEditForm(false);
    const handleShowEditForm = () => setShowEditForm(true);

    return (
        <div >{contact.nickname ? <h1>{contact.nickname}</h1> : <div><h1>{contact.firstName} {contact.lastName} <img className="contact_photo" src={contact.photo} alt={contact.first_name} style={{ display: "inline-block" }} ></img></h1> </div>}</div >
    )
}

export default ContactInList