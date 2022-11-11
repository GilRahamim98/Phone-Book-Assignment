import React, { useEffect, useState } from 'react'
import { getContacts, pushEvent } from '../DAL/api'
import ContactInList from './ContactInList'
import './PhoneBook.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { VscSearch } from "react-icons/vsc";
import { TbUserPlus } from "react-icons/tb";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import ContactForm from './ContactForm';




function PhoneBook() {
    const [contacts, setContacts] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);


    const handleCloseAddForm = () => setShowAddForm(false);
    const handleShowAddForm = () => setShowAddForm(true);
    useEffect(() => {
        async function getContactsList() {
            setContacts(await getContacts())

        }
        getContactsList()
    }, [])



    const renderHover = (
        <Popover id="popover-basic">
            <Popover.Body>
                Add new contact!
            </Popover.Body>
        </Popover>
    );
    const handleScroll = async (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        const top = e.target.scrollHeight - e.target.clientHeight === 5
        console.log(e.target.scrollHeight - e.target.clientHeight);


        if (bottom) {
            const newContacts = [...contacts]
            const firstContact = newContacts.shift()
            newContacts.push(firstContact)
            setContacts(newContacts)
        } else if (top) {
            console.log("hey");
        }

    }


    const createList = () => {
        return contacts.length >= 5 ? contacts.slice(0, 5).map(contact => <ContactInList key={contact.id} {...contact}></ContactInList>) : contacts.map(contact => <ContactInList key={contact.id} {...contact}></ContactInList>)
    }


    return (
        <div>
            <OverlayTrigger rootClose placement="bottom" overlay={renderHover} >
                <Button className="topcorner" variant="outline-dark" size="lg" onClick={handleShowAddForm}><TbUserPlus ></TbUserPlus></Button>
            </OverlayTrigger>
            <h1 className='display-1'>Contacts List</h1>

            <div>
                <section style={{ display: 'flex' }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Search"
                        className="search_bar"
                    >
                        <Form.Control type="search" placeholder="Search ..." />
                    </FloatingLabel>
                    <Button variant="outline-dark"><VscSearch></VscSearch></Button>


                </section>


                <div className='scroll' onScroll={handleScroll}>
                    {contacts ? createList() : null}

                </div>
                <Modal show={showAddForm} onHide={handleCloseAddForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><ContactForm></ContactForm></Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={handleCloseAddForm}>
                            Discard
                        </Button>
                        <Button variant="outline-dark" onClick={handleCloseAddForm}>
                            Add!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}

export default PhoneBook