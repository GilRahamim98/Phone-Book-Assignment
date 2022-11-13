import { IsNotEmpty } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetContactArgs {
  @Field()
  @IsNotEmpty()
  contactId: string;
}
