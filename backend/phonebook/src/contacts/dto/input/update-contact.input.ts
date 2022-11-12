/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';

@InputType()
export class UpdateContactInput {
  @Field()
  @IsNotEmpty()
  contactId: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsOptional()
  nickname?: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  phoneNumbers: string[];

  @Field()
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  photo: string;
}
