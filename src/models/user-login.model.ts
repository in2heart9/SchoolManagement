import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserLogin extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  user_login_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  ip_address: string;

  @property({
    type: 'date',
    required: true,
  })
  access_time: string;

  @property({
    type: 'boolean',
  })
  success?: boolean;

  @belongsTo(() => User, {name: 'user'})
  user_id: number;

  constructor(data?: Partial<UserLogin>) {
    super(data);
  }
}

export interface UserLoginRelations {
  // describe navigational properties here
}

export type UserLoginWithRelations = UserLogin & UserLoginRelations;
