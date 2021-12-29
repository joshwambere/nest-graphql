import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRep: Repository<Pet>) {}
  async create(createPetInput: CreatePetInput): Promise<Pet> {
    return await this.petsRep.save({ ...createPetInput });
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRep.find();
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRep.findOneOrFail(id);
  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
    const pet = this.findOne(id);
    if (!pet) throw NotFoundException;
    return await this.petsRep.save({ ...pet, ...updatePetInput });
  }

  async remove(id: number): Promise<any> {
    const pet = this.findOne(id);
    if (!pet) throw NotFoundException;
    const deleted = await this.petsRep.delete(id);
    return deleted
      ? { message: 'pet deleted successfully' }
      : { message: 'something wrong happened' };
  }
}
