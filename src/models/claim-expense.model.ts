import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Affiliation} from './affiliation.model';
import {School} from './school.model';

@model()
export class ClaimExpense extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  claim_expense_id?: number;

  @property({
    type: 'date',
    required: true,
  })
  request_at: string;

  @property({
    type: 'number',
    required: true,
  })
  request_by: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
  })
  remark?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  is_approved: boolean;

  @property({
    type: 'date',
  })
  approved_at?: string;

  @property({
    type: 'number',
  })
  approved_by?: number;

  @belongsTo(() => Affiliation, {name: 'affiliation'})
  affiliation_id: number;

  @belongsTo(() => School, {name: 'school'})
  school_id: number;

  constructor(data?: Partial<ClaimExpense>) {
    super(data);
  }
}

export interface ClaimExpenseRelations {
  // describe navigational properties here
}

export type ClaimExpenseWithRelations = ClaimExpense & ClaimExpenseRelations;
