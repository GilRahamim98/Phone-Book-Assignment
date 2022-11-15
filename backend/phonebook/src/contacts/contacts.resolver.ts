import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { GetContactArgs } from './dto/args/get-contact.args';
import { GetContactsArgs } from './dto/args/get-contacts.args';
import { GetSearchArgs } from './dto/args/get-search.args';
import { CreateContactInput } from './dto/input/create-contact.input';
import { DeleteContactInput } from './dto/input/delete-contact.input';
import { UpdateContactInput } from './dto/input/update-contact.input';
import { Contact } from './models/contact';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Query(() => Contact, { name: 'contact', nullable: true })
  async getContact(@Args() getContactArgs: GetContactArgs): Promise<Contact> {
    return this.contactsService.getContact(getContactArgs);
  }

  @Query(() => [Contact], { name: 'contacts', nullable: 'items' })
  async getContacts(): Promise<Contact[]> {
    return this.contactsService.getContacts();
  }

  @Query(() => [Contact], { name: 'search', nullable: 'items' })
  async getSearch(@Args() getSearchArgs: GetSearchArgs): Promise<Contact[]> {
    return this.contactsService.getSearch(getSearchArgs);
  }

  @Mutation(() => Contact)
  async createContact(
    @Args('createContactData') createContactData: CreateContactInput,
  ): Promise<Contact> {
    return this.contactsService.createContact(createContactData);
  }

  @Mutation(() => Contact)
  async updateContact(
    @Args('updateContactData') updateContactData: UpdateContactInput,
  ): Promise<Contact> {
    return this.contactsService.updateContact(updateContactData);
  }

  @Mutation(() => Contact)
  async deleteContact(
    @Args('deleteContactData') deleteContactData: DeleteContactInput,
  ): Promise<Contact> {
    return this.contactsService.deleteContact(deleteContactData);
  }
}
