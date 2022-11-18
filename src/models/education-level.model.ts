import {Entity, model, property, hasMany} from '@loopback/repository';
import {SchoolEducationLevel} from './school-education-level.model';

@model()
export class EducationLevel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  education_level_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  education_level_name: string;

  @hasMany(() => SchoolEducationLevel, {keyTo: 'education_level_id'})
  schoolEducationLevels: SchoolEducationLevel[];

  constructor(data?: Partial<EducationLevel>) {
    super(data);
  }
}

export interface EducationLevelRelations {
  // describe navigational properties here
}

export type EducationLevelWithRelations = EducationLevel & EducationLevelRelations;
