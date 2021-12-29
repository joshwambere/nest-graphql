import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownerRep: Repository<Owner>) {}
  async create(createOwnerInput: CreateOwnerInput) {
    return await this.ownerRep.save(createOwnerInput);
  }

  async findAll() {
    return await this.ownerRep.find();
  }

  async findOne(id: number) {
    return await this.ownerRep.findOneOrFail(id);
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const owner = this.findOne(id);
    if (!owner) throw new NotFoundException();
    return await this.ownerRep.save({ ...owner, ...updateOwnerInput });
  }

  async remove(id: number) {
    return await this.ownerRep.delete(id);
  }
}
