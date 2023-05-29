import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// !other import
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
