import React, { useEffect, useState, useRef } from 'react'
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
import { useSearch } from '../hooks/useSearch';




function PhoneBook() {
    const { error, loading, data } = useContacts()
    const [contacts, setContacts] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchVal, setSearchVal] = useState("")
    const searchData = useSearch(searchVal).data
    const scollPosition = useRef(0)
    const [scrollObj, setScrollObj] = useState({ offset: 0, limit: 5 })

    const handleCloseAddForm = () => setShowAddForm(false);
    const handleShowAddForm = () => setShowAddForm(true);
    useEffect(() => {
        getContactsList(data)

    }, [loading])

    function getContactsList(data) {
        if (!loading) {
            setContacts([...data.contacts])
        }
    }

    const renderHover = (
        <Popover id="popover-basic">
            <Popover.Body>
                Add new contact!
            </Popover.Body>
        </Popover>
    )

    const handleScroll = async (e) => {
        const position = e.target.scrollTop;
        if (position > scollPosition.current) {
            if (scrollObj.limit + 5 > contacts.length) {
                const range = scrollObj.limit + 5 - contacts.length;
                setScrollObj({ offset: scrollObj.limit - range, limit: scrollObj.limit + 5 - range })
                return
            }
            setScrollObj({ offset: scrollObj.limit, limit: scrollObj.limit + 5 })

        } else {
            if (scrollObj.offset - 5 < 0) {
                console.log(scrollObj.offset)
                setScrollObj({ offset: 0, limit: scrollObj.limit - scrollObj.offset })

                return
            }
            setScrollObj({ offset: scrollObj.offset - 5, limit: scrollObj.limit - 5 })
        }
        scollPosition.current = position;
    }
    const handleSearchChange = (e) => {
        setSearchVal(e.target.value)
    }
    const handleOnClickEvent = () => {
        setContacts(searchData.search)
    }

    const createList = () => {
        if (contacts.length === 0) return <h1>There are no contacts listed...</h1>
        return contacts.slice(scrollObj.offset, scrollObj.limit).map(contact => <ContactInList key={contact.contactId} contact={contact} getContacts={getContactsList}></ContactInList>)
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
                        <Form.Control type="search" placeholder="Search ..." onChange={handleSearchChange} />
                    </FloatingLabel>
                    <Button variant="outline-dark" onClick={handleOnClickEvent}><VscSearch></VscSearch></Button>


                </section>


                <div className='scroll' onScroll={handleScroll}>
                    {loading ? null : createList()}
                    {error ? <h1>Something Went Wrong!</h1> : null}

                </div>
                <Modal show={showAddForm} onHide={handleCloseAddForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><ContactForm handleCloseAddForm={handleCloseAddForm}></ContactForm></Modal.Body>

                </Modal>
            </div>

        </div>
    )
}

export default PhoneBook