import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from '@nestjs/class-validator';

@InputType()
export class CreateContactInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  nickname?: string;

  @Field(() => [String])
  @IsNotEmpty()
  phoneNumbers: string[];

  @Field()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsNotEmpty()
  photo: string;
}
