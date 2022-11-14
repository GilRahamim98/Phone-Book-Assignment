import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the contact' })
  contactId: string;
  @Column()
  @Field(() => String, { description: 'first name of the contact' })
  firstName: string;
  @Column()
  @Field(() => String, { description: 'last name of the contact' })
  lastName: string;
  @Column({ nullable: true, default: null })
  @Field({ description: 'nickname of the contact' })
  nickname?: string;
  @Column('text', { array: true })
  phoneNumbers: string[];
  @Column()
  @Field(() => String, { description: 'address of the contact' })
  address: string;
  @Column('text', { array: true })
  photo: string[];
}
