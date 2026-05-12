/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon already exists: ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        `Can't create Pokemon - check server logs`,
      );
    }
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(id: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ no: +id });
    }
    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: id.toLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon '${id}' not found`);

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon already exists: ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new NotFoundException(`Pokemon '${id}' not found`);
    return;
  }
}
