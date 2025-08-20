import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UploadFileService } from './upload-file.service';
import { UploadFile } from './entities/upload-file.entity';
import { CreateUploadFileInput } from './dto/create-upload-file.input';
import { UpdateUploadFileInput } from './dto/update-upload-file.input';

@Resolver(() => UploadFile)
export class UploadFileResolver {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Mutation(() => UploadFile)
  createUploadFile(
    @Args('createUploadFileInput') createUploadFileInput: CreateUploadFileInput,
  ) {
    return this.uploadFileService.create(createUploadFileInput);
  }

  @Query(() => [UploadFile], { name: 'uploadFile' })
  findAll() {
    return this.uploadFileService.findAll();
  }

  @Query(() => UploadFile, { name: 'uploadFile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.uploadFileService.findOne(id);
  }

  @Mutation(() => UploadFile)
  updateUploadFile(
    @Args('updateUploadFileInput') updateUploadFileInput: UpdateUploadFileInput,
  ) {
    return this.uploadFileService.update(
      updateUploadFileInput.id,
      updateUploadFileInput,
    );
  }

  @Mutation(() => UploadFile)
  removeUploadFile(@Args('id', { type: () => Int }) id: number) {
    return this.uploadFileService.remove(id);
  }
}
