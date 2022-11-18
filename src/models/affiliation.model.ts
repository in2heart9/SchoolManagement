import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {AffiliationType} from './affiliation-type.model';
import {ClaimExpense} from './claim-expense.model';

@model()
export class Affiliation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  affiliation_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  affiliation_name: string;

  @belongsTo(() => AffiliationType, {name: 'affiliation_type'})
  affiliation_type_id: number;

  @hasMany(() => ClaimExpense, {keyTo: 'affiliation_id'})
  claimExpenses: ClaimExpense[];

  constructor(data?: Partial<Affiliation>) {
    super(data);
  }
}

export interface AffiliationRelations {
  // describe navigational properties here
}

export type AffiliationWithRelations = Affiliation & AffiliationRelations;
