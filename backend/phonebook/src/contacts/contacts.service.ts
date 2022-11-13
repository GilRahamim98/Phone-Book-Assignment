import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetContactArgs } from './dto/args/get-contact.args';
import { GetContactsArgs } from './dto/args/get-contacts.args';
import { CreateContactInput } from './dto/input/create-contact.input';
import { DeleteContactInput } from './dto/input/delete-contact.input';
import { UpdateContactInput } from './dto/input/update-contact.input';
import { Contact } from './models/contact';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}
  private contacts: Contact[] = [];

  async createContact(createContactData: CreateContactInput): Promise<Contact> {
    // const contact: Contact = {
    //   contactId: uuidv4(),
    //   ...createContactData,
    // };
    // this.contacts.push(contact);
    // return contact;
    const contact = this.contactRepository.create(createContactData);
    return await this.contactRepository.save(contact);
  }

  async updateContact(updateContactData: UpdateContactInput): Promise<Contact> {
    // const contact = this.contacts.find(
    //   (contact) => contact.contactId === updateContactData.contactId,
    // );

    // Object.assign(contact, updateContactData);
    // return contact;
    const contact = await this.contactRepository.preload({
      contactId: updateContactData.contactId,
      ...updateContactData,
    });
    if (!contact) {
      throw new NotFoundException(
        `Contact #${updateContactData.contactId} not found`,
      );
    }
    return this.contactRepository.save(contact);
  }

  async getContact(getContactArgs: GetContactArgs): Promise<Contact> {
    // return this.contacts.find(
    //   (contact) => contact.contactId === getContactArgs.contactId,
    // );
    const contact = await this.contactRepository.findOne({
      where: {
        contactId: getContactArgs.contactId,
      },
    });
    if (!contact) {
      throw new NotFoundException(
        `Contact #${getContactArgs.contactId} not found`,
      );
    }
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    // return getContactsArgs.contactIds.map((contactId) =>
    //   this.getContact({ contactId }),
    // );
    return this.contactRepository.find();
  }

  async deleteContact(deleteContactData: DeleteContactInput): Promise<Contact> {
    // const contactIndex = this.contacts.findIndex(
    //   (contact) => contact.contactId === deleteContactData.contactId,
    // );
    // const contact = this.contacts[contactIndex];
    // this.contacts.splice(contactIndex);
    // return contact;
    const contact = await this.getContact(deleteContactData);
    await this.contactRepository.remove(contact);
    return contact;
  }
}
