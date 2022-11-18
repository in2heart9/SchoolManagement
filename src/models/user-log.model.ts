import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserLog extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  user_log_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  action: number;

  @property({
    type: 'string',
  })
  entity_name?: string;

  @property({
    type: 'string',
  })
  log?: string;

  @property({
    type: 'date',
  })
  action_at?: string;

  @belongsTo(() => User, {name: 'user'})
  user_id: number;

  constructor(data?: Partial<UserLog>) {
    super(data);
  }
}

export interface UserLogRelations {
  // describe navigational properties here
}

export type UserLogWithRelations = UserLog & UserLogRelations;
