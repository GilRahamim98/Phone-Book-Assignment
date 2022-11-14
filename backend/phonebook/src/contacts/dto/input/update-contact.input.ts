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

  @Field({ nullable: true })
  @IsOptional()
  nickname?: string;

  @Field(() => [String])
  @IsOptional()
  @IsNotEmpty()
  phoneNumbers: string[];

  @Field()
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @Field(() => [String])
  @IsOptional()
  @IsNotEmpty()
  photo: string[];
}
