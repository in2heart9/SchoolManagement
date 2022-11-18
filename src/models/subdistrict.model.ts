import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {District} from './district.model';
import {School} from './school.model';

@model()
export class Subdistrict extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  subdistrict_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  subdistrict_name: string;

  @belongsTo(() => District, {name: 'district'})
  district_id: number;

  @hasMany(() => School, {keyTo: 'subdistrict_id'})
  schools: School[];

  constructor(data?: Partial<Subdistrict>) {
    super(data);
  }
}

export interface SubdistrictRelations {
  // describe navigational properties here
}

export type SubdistrictWithRelations = Subdistrict & SubdistrictRelations;
