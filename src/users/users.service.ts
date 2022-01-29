import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { Payload } from 'src/auth/payload';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { GenreMovieDto } from 'src/movies/dto/create-movie.dto';
//nadOYiFuUs2VWIAX
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: string) {
    console.log(id)
    return await this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findByPayload(payload: Payload) {
    const { id } = payload;
    return await this.userModel.findOne({ id });
  }
  async findByIdSetFavourite(id: string, genre: GenreMovieDto) {
    const user = await this.userModel.findById(id);
    user.favouriteGenre.push(genre.name);
    user.save();
    return this.sanitizeUser(user);
  }

  async create(RegisterDTO: CreateUserDto) {
    const { username } = RegisterDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(RegisterDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }
  async login(UserDTO: LoginDTO) {
    const { username, password } = UserDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  // return user object without password
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
