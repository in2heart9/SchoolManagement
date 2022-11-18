import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {SchoolEducationLevel, SchoolEducationLevelRelations, School, EducationLevel} from '../models';
import {SchoolRepository} from './school.repository';
import {EducationLevelRepository} from './education-level.repository';

export class SchoolEducationLevelRepository extends DefaultCrudRepository<
  SchoolEducationLevel,
  typeof SchoolEducationLevel.prototype.school_education_level_id,
  SchoolEducationLevelRelations
> {

  public readonly school: BelongsToAccessor<School, typeof SchoolEducationLevel.prototype.school_education_level_id>;

  public readonly education_level: BelongsToAccessor<EducationLevel, typeof SchoolEducationLevel.prototype.school_education_level_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>, @repository.getter('EducationLevelRepository') protected educationLevelRepositoryGetter: Getter<EducationLevelRepository>,
  ) {
    super(SchoolEducationLevel, dataSource);
    this.education_level = this.createBelongsToAccessorFor('education_level', educationLevelRepositoryGetter,);
    this.registerInclusionResolver('education_level', this.education_level.inclusionResolver);
    this.school = this.createBelongsToAccessorFor('school', schoolRepositoryGetter,);
    this.registerInclusionResolver('school', this.school.inclusionResolver);
  }
}
