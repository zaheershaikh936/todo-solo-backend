import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
// !other import
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth, AuthDocument } from './entities/auth.entity';
import { HttpCodes } from '../../utils/response-formatter';
import createJWTToken from '../../middleware/create-token';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private AuthModel: Model<AuthDocument>) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const salt = await genSalt(10);
      createAuthDto.password = await hash(createAuthDto.password, salt);
      const result = await this.AuthModel.create(createAuthDto);
      const data = await result.save();
      const token = await createJWTToken({
        email: data?.email,
        id: String(data?._id),
      });
      return {
        message: 'User Create Successfully',
        statusCode: HttpCodes.SUCCESS,
        result: { token, data },
      };
    } catch (error) {
      return {
        message: error,
        statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;
      const data = await this.AuthModel.findOne({ email: email });
      if (!data)
        return {
          message: 'Invalided email.',
          statusCode: HttpCodes.BAD_REQUEST,
        };
      const IsValid = await compare(password, data.password);
      if (!IsValid) {
        console.log(IsValid);
        return {
          message: 'Invalided password.',
          statusCode: HttpCodes.BAD_REQUEST,
        };
      }
      delete data.password;
      const token = await createJWTToken({ email, id: String(data?._id) });
      return {
        message: 'Login Successfully.',
        statusCode: HttpCodes.SUCCESS,
        result: { data, token },
      };
    } catch (error) {
      return {
        message: error,
        statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
