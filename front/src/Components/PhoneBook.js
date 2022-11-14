import React, { useEffect, useState } from 'react'
import { useContacts } from '../hooks/useContacts'
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
    const { error, loading, data } = useContacts()
    const [contacts, setContacts] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);



    const handleCloseAddForm = () => setShowAddForm(false);
    const handleShowAddForm = () => setShowAddForm(true);
    useEffect(() => {
        async function getContactsList() {
            if (!loading) {
                setContacts([...data.contacts])

            }

        }
        getContactsList()
    }, [loading])



    const renderHover = (
        <Popover id="popover-basic">
            <Popover.Body>
                Add new contact!
            </Popover.Body>
        </Popover>
    );
    const handleScroll = async (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;




        if (bottom) {
            const newContacts = [...contacts]
            const firstContact = newContacts.shift()
            newContacts.push(firstContact)
            setContacts(newContacts)
        }


    }


    const createList = () => {
        return contacts.slice(0, 5).map(contact => <ContactInList key={contact.contactId} {...contact}></ContactInList>)
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
                    {loading ? null : createList()}
                    {error ? <h1>Something Went Wrong!</h1> : null}

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