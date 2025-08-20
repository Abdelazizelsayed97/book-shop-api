import { Injectable } from '@nestjs/common';
import { CreateUploadFileInput } from './dto/create-upload-file.input';
import { UpdateUploadFileInput } from './dto/update-upload-file.input';

@Injectable()
export class UploadFileService {
  create(createUploadFileInput: CreateUploadFileInput) {
    // TODO: remove createUploadFileInput if not used
    return 'This action adds a new uploadFile';
  }

  findAll() {
    return `This action returns all uploadFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  update(id: string, updateUploadFileInput: UpdateUploadFileInput) {
    // TODO: remove updateUploadFileInput if not used
    return `This action updates a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
