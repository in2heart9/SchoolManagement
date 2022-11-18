import {Entity, model, property, hasMany} from '@loopback/repository';
import {District} from './district.model';
import {School} from './school.model';

@model()
export class Province extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  province_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  province_name: string;

  @hasMany(() => District, {keyTo: 'province_id'})
  districts: District[];

  @hasMany(() => School, {keyTo: 'province_id'})
  schools: School[];

  constructor(data?: Partial<Province>) {
    super(data);
  }
}

export interface ProvinceRelations {
  // describe navigational properties here
}

export type ProvinceWithRelations = Province & ProvinceRelations;
