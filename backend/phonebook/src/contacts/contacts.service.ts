import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetContactArgs } from './dto/args/get-contact.args';
import { GetContactsArgs } from './dto/args/get-contacts.args';
import { CreateContactInput } from './dto/input/create-contact.input';
import { DeleteContactInput } from './dto/input/delete-contact.input';
import { UpdateContactInput } from './dto/input/update-contact.input';
import { Contact } from './models/contact';

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];

  public createContact(createContactData: CreateContactInput): Contact {
    const contact: Contact = {
      contactId: uuidv4(),
      ...createContactData,
    };
    this.contacts.push(contact);
    return contact;
  }

  public updateContact(updateContactData: UpdateContactInput): Contact {
    const contact = this.contacts.find(
      (contact) => contact.contactId === updateContactData.contactId,
    );

    Object.assign(contact, updateContactData);
    return contact;
  }

  public getContact(getContactArgs: GetContactArgs): Contact {
    return this.contacts.find(
      (contact) => contact.contactId === getContactArgs.contactId,
    );
  }

  public getContacts(getContactsArgs: GetContactsArgs): Contact[] {
    return getContactsArgs.contactIds.map((contactId) =>
      this.getContact({ contactId }),
    );
  }

  public deleteContact(deleteContactData: DeleteContactInput): Contact {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.contactId === deleteContactData.contactId,
    );
    const contact = this.contacts[contactIndex];
    this.contacts.splice(contactIndex);
    return contact;
  }
}
