import {Entity, model, property, belongsTo} from '@loopback/repository';
import {School} from './school.model';

@model()
export class SchoolLog extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  school_log_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'number',
  })
  updated_by?: number;

  @belongsTo(() => School, {name: 'school'})
  school_id: number;

  constructor(data?: Partial<SchoolLog>) {
    super(data);
  }
}

export interface SchoolLogRelations {
  // describe navigational properties here
}

export type SchoolLogWithRelations = SchoolLog & SchoolLogRelations;
