import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ClassLevel} from './class-level.model';
import {School} from './school.model';

@model()
export class StudentStat extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  student_stat_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  school_year: number;

  @property({
    type: 'number',
    default: 1,
  })
  semester?: number;

  @property({
    type: 'number',
    required: true,
  })
  male_count: number;

  @property({
    type: 'number',
    required: true,
  })
  female_count: number;

  @belongsTo(() => ClassLevel, {name: 'class_level'})
  class_level_id: number;

  @belongsTo(() => School, {name: 'school'})
  school_id: number;

  constructor(data?: Partial<StudentStat>) {
    super(data);
  }
}

export interface StudentStatRelations {
  // describe navigational properties here
}

export type StudentStatWithRelations = StudentStat & StudentStatRelations;
