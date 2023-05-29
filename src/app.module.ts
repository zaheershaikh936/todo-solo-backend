import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { LoggerMiddleware } from './utils/http.logger';
import JwtValidatedMiddleware from './middleware/token.validation';

// !other import
import { AuthModule } from './controllers/auth/auth.module';
import { TodosModule } from './controllers/todos/todos.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB), AuthModule, TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(JwtValidatedMiddleware)
      .exclude(
        { path: '/auth', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
