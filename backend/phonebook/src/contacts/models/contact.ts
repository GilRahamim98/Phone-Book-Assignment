import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field()
  contactId: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  nickname?: string;
  @Field(() => [String])
  phoneNumbers: string[];
  @Field()
  address: string;
  @Field()
  photo: string;
}
