import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {AffiliationType} from './affiliation-type.model';
import {Affiliation} from './affiliation.model';
import {ClaimExpense} from './claim-expense.model';
import {District} from './district.model';
import {Province} from './province.model';
import {SchoolClassLevel} from './school-class-level.model';
import {SchoolEducationLevel} from './school-education-level.model';
import {SchoolLog} from './school-log.model';
import {SchoolType} from './school-type.model';
import {StudentStat} from './student-stat.model';
import {Subdistrict} from './subdistrict.model';

@model()
export class School extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  school_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  annual: number;

  @property({
    type: 'string',
    required: true,
  })
  school_code: string;

  @property({
    type: 'string',
    required: true,
  })
  school_name: string;

  @property({
    type: 'string',
    required: true,
  })
  home_no: string;

  @property({
    type: 'string',
  })
  village_no?: string;

  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  postal_code?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'number',
    required: true,
  })
  current_status: number;

  @property({
    type: 'boolean',
    required: true,
  })
  is_active: boolean;

  @property({
    type: 'number',
  })
  latitude?: number;

  @property({
    type: 'number',
  })
  longitude?: number;

  @property({
    type: 'date',
  })
  deleted_at?: string;

  @property({
    type: 'number',
  })
  deleted_by?: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'number',
  })
  created_by?: number;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @property({
    type: 'number',
  })
  updated_by?: number;

  @belongsTo(() => AffiliationType, {name: 'affiliation_type'})
  affiliation_type_id: number;

  @belongsTo(() => Affiliation, {name: 'affiliation_id'})
  affiliation_id: number;

  @hasMany(() => ClaimExpense, {keyTo: 'school_id'})
  claimExpenses: ClaimExpense[];

  @hasMany(() => SchoolEducationLevel, {keyTo: 'school_id'})
  schoolEducationLevels: SchoolEducationLevel[];

  @belongsTo(() => SchoolType, {name: 'school_type'})
  school_type_id: number;

  @hasMany(() => SchoolClassLevel, {keyTo: 'school_id'})
  schoolClassLevels: SchoolClassLevel[];

  @hasMany(() => StudentStat, {keyTo: 'school_id'})
  studentStats: StudentStat[];

  @hasMany(() => SchoolLog, {keyTo: 'school_id'})
  schoolLogs: SchoolLog[];

  @belongsTo(() => Province, {name: 'province'})
  province_id: number;

  @belongsTo(() => District, {name: 'district'})
  district_id: number;

  @belongsTo(() => Subdistrict, {name: 'subdistrict'})
  subdistrict_id: number;

  constructor(data?: Partial<School>) {
    super(data);
  }
}

export interface SchoolRelations {
  // describe navigational properties here
}

export type SchoolWithRelations = School & SchoolRelations;
