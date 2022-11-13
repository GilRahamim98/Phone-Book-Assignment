import { IsArray } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetContactsArgs {
  @Field(() => [String])
  @IsArray()
  contactIds: string[];
}
