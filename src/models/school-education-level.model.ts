import {Entity, model, property, belongsTo} from '@loopback/repository';
import {School} from './school.model';
import {EducationLevel} from './education-level.model';

@model()
export class SchoolEducationLevel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  school_education_level_id?: number;

  @belongsTo(() => School, {name: 'school'})
  school_id: number;

  @belongsTo(() => EducationLevel, {name: 'education_level'})
  education_level_id: number;

  constructor(data?: Partial<SchoolEducationLevel>) {
    super(data);
  }
}

export interface SchoolEducationLevelRelations {
  // describe navigational properties here
}

export type SchoolEducationLevelWithRelations = SchoolEducationLevel & SchoolEducationLevelRelations;
