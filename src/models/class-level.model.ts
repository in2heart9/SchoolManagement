import {Entity, model, property, hasMany} from '@loopback/repository';
import {SchoolClassLevel} from './school-class-level.model';
import {StudentStat} from './student-stat.model';

@model()
export class ClassLevel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  class_level_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  class_level_name: string;

  @hasMany(() => SchoolClassLevel, {keyTo: 'class_level_id'})
  schoolClassLevels: SchoolClassLevel[];

  @hasMany(() => StudentStat, {keyTo: 'class_level_id'})
  studentStats: StudentStat[];

  constructor(data?: Partial<ClassLevel>) {
    super(data);
  }
}

export interface ClassLevelRelations {
  // describe navigational properties here
}

export type ClassLevelWithRelations = ClassLevel & ClassLevelRelations;
