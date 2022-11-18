import {Entity, model, property, hasMany} from '@loopback/repository';
import {School} from './school.model';

@model()
export class SchoolType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  school_type_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  school_type_name: string;

  @hasMany(() => School, {keyTo: 'school_type_id'})
  schools: School[];

  constructor(data?: Partial<SchoolType>) {
    super(data);
  }
}

export interface SchoolTypeRelations {
  // describe navigational properties here
}

export type SchoolTypeWithRelations = SchoolType & SchoolTypeRelations;
