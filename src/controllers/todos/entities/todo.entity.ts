import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from '../../auth/entities/auth.entity';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ versionKey: false })
export class Todo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  userId: Auth;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contain: string;

  @Prop({ required: true, enum: ['important', 'non-important', 'later'] })
  type: string;

  @Prop({ required: true, default: false })
  like: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
