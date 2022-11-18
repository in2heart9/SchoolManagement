import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {
  AffiliationType,
  ClaimExpense,
  District,
  Province,
  School,
  SchoolClassLevel,
  SchoolEducationLevel,
  SchoolLog,
  SchoolRelations,
  SchoolType,
  StudentStat,
  Subdistrict,
} from '../models';
import {AffiliationTypeRepository} from './affiliation-type.repository';
import {ClaimExpenseRepository} from './claim-expense.repository';
import {DistrictRepository} from './district.repository';
import {ProvinceRepository} from './province.repository';
import {SchoolClassLevelRepository} from './school-class-level.repository';
import {SchoolEducationLevelRepository} from './school-education-level.repository';
import {SchoolLogRepository} from './school-log.repository';
import {SchoolTypeRepository} from './school-type.repository';
import {StudentStatRepository} from './student-stat.repository';
import {SubdistrictRepository} from './subdistrict.repository';

export class SchoolRepository extends DefaultCrudRepository<
  School,
  typeof School.prototype.school_id,
  SchoolRelations
> {
  public readonly affiliation_type: BelongsToAccessor<
    AffiliationType,
    typeof School.prototype.school_id
  >;

  public readonly claimExpenses: HasManyRepositoryFactory<
    ClaimExpense,
    typeof School.prototype.school_id
  >;

  public readonly schoolEducationLevels: HasManyRepositoryFactory<
    SchoolEducationLevel,
    typeof School.prototype.school_id
  >;

  public readonly school_type: BelongsToAccessor<
    SchoolType,
    typeof School.prototype.school_id
  >;

  public readonly schoolClassLevels: HasManyRepositoryFactory<
    SchoolClassLevel,
    typeof School.prototype.school_id
  >;

  public readonly studentStats: HasManyRepositoryFactory<
    StudentStat,
    typeof School.prototype.school_id
  >;

  public readonly schoolLogs: HasManyRepositoryFactory<
    SchoolLog,
    typeof School.prototype.school_id
  >;

  public readonly province: BelongsToAccessor<
    Province,
    typeof School.prototype.school_id
  >;

  public readonly district: BelongsToAccessor<
    District,
    typeof School.prototype.school_id
  >;

  public readonly subdistrict: BelongsToAccessor<
    Subdistrict,
    typeof School.prototype.school_id
  >;

  constructor(
    @inject('datasources.SchoolDatasource')
    dataSource: SchoolDatasourceDataSource,
    @repository.getter('AffiliationTypeRepository')
    protected affiliationTypeRepositoryGetter: Getter<AffiliationTypeRepository>,
    @repository.getter('ClaimExpenseRepository')
    protected claimExpenseRepositoryGetter: Getter<ClaimExpenseRepository>,
    @repository.getter('SchoolEducationLevelRepository')
    protected schoolEducationLevelRepositoryGetter: Getter<SchoolEducationLevelRepository>,
    @repository.getter('SchoolTypeRepository')
    protected schoolTypeRepositoryGetter: Getter<SchoolTypeRepository>,
    @repository.getter('SchoolClassLevelRepository')
    protected schoolClassLevelRepositoryGetter: Getter<SchoolClassLevelRepository>,
    @repository.getter('StudentStatRepository')
    protected studentStatRepositoryGetter: Getter<StudentStatRepository>,
    @repository.getter('SchoolLogRepository')
    protected schoolLogRepositoryGetter: Getter<SchoolLogRepository>,
    @repository.getter('ProvinceRepository')
    protected provinceRepositoryGetter: Getter<ProvinceRepository>,
    @repository.getter('DistrictRepository')
    protected districtRepositoryGetter: Getter<DistrictRepository>,
    @repository.getter('SubdistrictRepository')
    protected subdistrictRepositoryGetter: Getter<SubdistrictRepository>,
  ) {
    super(School, dataSource);
    this.subdistrict = this.createBelongsToAccessorFor(
      'subdistrict',
      subdistrictRepositoryGetter,
    );
    this.registerInclusionResolver(
      'subdistrict',
      this.subdistrict.inclusionResolver,
    );
    this.district = this.createBelongsToAccessorFor(
      'district',
      districtRepositoryGetter,
    );
    this.registerInclusionResolver('district', this.district.inclusionResolver);
    this.province = this.createBelongsToAccessorFor(
      'province',
      provinceRepositoryGetter,
    );
    this.registerInclusionResolver('province', this.province.inclusionResolver);
    this.schoolLogs = this.createHasManyRepositoryFactoryFor(
      'schoolLogs',
      schoolLogRepositoryGetter,
    );
    this.registerInclusionResolver(
      'schoolLogs',
      this.schoolLogs.inclusionResolver,
    );
    this.studentStats = this.createHasManyRepositoryFactoryFor(
      'studentStats',
      studentStatRepositoryGetter,
    );
    this.registerInclusionResolver(
      'studentStats',
      this.studentStats.inclusionResolver,
    );
    this.schoolClassLevels = this.createHasManyRepositoryFactoryFor(
      'schoolClassLevels',
      schoolClassLevelRepositoryGetter,
    );
    this.registerInclusionResolver(
      'schoolClassLevels',
      this.schoolClassLevels.inclusionResolver,
    );
    this.school_type = this.createBelongsToAccessorFor(
      'school_type',
      schoolTypeRepositoryGetter,
    );
    this.registerInclusionResolver(
      'school_type',
      this.school_type.inclusionResolver,
    );
    this.schoolEducationLevels = this.createHasManyRepositoryFactoryFor(
      'schoolEducationLevels',
      schoolEducationLevelRepositoryGetter,
    );
    this.registerInclusionResolver(
      'schoolEducationLevels',
      this.schoolEducationLevels.inclusionResolver,
    );
    this.claimExpenses = this.createHasManyRepositoryFactoryFor(
      'claimExpenses',
      claimExpenseRepositoryGetter,
    );
    this.registerInclusionResolver(
      'claimExpenses',
      this.claimExpenses.inclusionResolver,
    );
    this.affiliation_type = this.createBelongsToAccessorFor(
      'affiliation_type',
      affiliationTypeRepositoryGetter,
    );
    this.registerInclusionResolver(
      'affiliation_type',
      this.affiliation_type.inclusionResolver,
    );
  }

  async findAll(): Promise<School> {
    const sql = 'select * from School';
    return <School>await this.execute(sql);
  }

  async findByName(school_name: string): Promise<School> {
    const sql =
      'select * from School where school_name like ' +
      '"%' +
      school_name +
      '%"';
    return <School>await this.execute(sql);
  }

  async findByCode(school_code: string): Promise<School> {
    const sql =
      'select * from School where school_code like ' +
      '"%' +
      school_code +
      '%"';
    return <School>await this.execute(sql);
  }

  async findByAnnual(annual: number): Promise<School> {
    const sql = 'select * from School where annual = ' + annual;
    return <School>await this.execute(sql);
  }

  async findByStatus(status: number): Promise<School> {
    const sql = 'select * from School where current_status = ' + status;
    return <School>await this.execute(sql);
  }

  async findByAffiliationType(affiliation_type_id: number): Promise<School> {
    const sql =
      'select * from School where affiliation_type_id = ' + affiliation_type_id;
    return <School>await this.execute(sql);
  }

  async findByAffiliation(affiliation_id: number): Promise<School> {
    const sql = 'select * from School where affiliation_id = ' + affiliation_id;
    return <School>await this.execute(sql);
  }

  async findByProvince(province_id: number): Promise<School> {
    const sql = 'select * from School where province_id = ' + province_id;
    return <School>await this.execute(sql);
  }
}
