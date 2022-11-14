import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field()
  contactId: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field({ nullable: true })
  nickname?: string;
  @Field(() => [String])
  phoneNumbers: string[];
  @Field()
  address: string;
  @Field(() => [String])
  photo: string[];
}
