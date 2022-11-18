import {Entity, model, property, hasMany} from '@loopback/repository';
import {School} from './school.model';
import {Affiliation} from './affiliation.model';

@model()
export class AffiliationType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  affiliation_type_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  affiliation_type_name: string;

  @hasMany(() => School, {keyTo: 'affiliation_type_id'})
  schools: School[];

  @hasMany(() => Affiliation, {keyTo: 'affiliation_type_id'})
  affiliations: Affiliation[];

  constructor(data?: Partial<AffiliationType>) {
    super(data);
  }
}

export interface AffiliationTypeRelations {
  // describe navigational properties here
}

export type AffiliationTypeWithRelations = AffiliationType & AffiliationTypeRelations;
