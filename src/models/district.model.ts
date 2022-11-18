import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Province} from './province.model';
import {Subdistrict} from './subdistrict.model';
import {School} from './school.model';

@model()
export class District extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  district_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  district_name: string;

  @belongsTo(() => Province, {name: 'province'})
  province_id: number;

  @hasMany(() => Subdistrict, {keyTo: 'district_id'})
  subdistricts: Subdistrict[];

  @hasMany(() => School, {keyTo: 'district_id'})
  schools: School[];

  constructor(data?: Partial<District>) {
    super(data);
  }
}

export interface DistrictRelations {
  // describe navigational properties here
}

export type DistrictWithRelations = District & DistrictRelations;
