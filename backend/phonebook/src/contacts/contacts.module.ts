import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsResolver } from './contacts.resolver';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactsResolver, ContactsService],
})
export class ContactsModule {}
