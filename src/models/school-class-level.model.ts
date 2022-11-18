import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ClassLevel} from './class-level.model';
import {School} from './school.model';

@model()
export class SchoolClassLevel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  school_class_level_id?: number;

  @belongsTo(() => ClassLevel, {name: 'class_level'})
  class_level_id: number;

  @belongsTo(() => School, {name: 'school'})
  school_id: number;

  constructor(data?: Partial<SchoolClassLevel>) {
    super(data);
  }
}

export interface SchoolClassLevelRelations {
  // describe navigational properties here
}

export type SchoolClassLevelWithRelations = SchoolClassLevel & SchoolClassLevelRelations;
