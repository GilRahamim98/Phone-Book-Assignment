import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';

@InputType()
export class CreateContactInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  nickname?: string;

  @Field(() => [String])
  @IsNotEmpty()
  phoneNumbers: string[];

  @Field()
  @IsNotEmpty()
  address: string;

  @Field(() => [String])
  @IsNotEmpty()
  photo: string[];
}
