/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateContactInput } from './dto/input/create-contact.input';
import { Contact } from './models/contact';

@Injectable()
export class ContactsService {
    private contacts:Contact[]=[];

    public createContact(createContactData:CreateContactInput):Contact{
        const contact:Contact={}
    }

    public updateContact():Contact{

    }

    public getContact():Contact{

    }

    public getContacts():Contact[]{

    }

    public deleteContact():Contact{

    }
}
