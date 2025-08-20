import { CreateUploadFileInput } from './create-upload-file.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUploadFileInput extends PartialType(CreateUploadFileInput) {
  @Field()
  id: string;
}
