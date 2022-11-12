/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from '@nestjs/class-validator';

@InputType()
export class DeleteContactInput {
  @Field()
  @IsNotEmpty()
  contactId: string;
}
