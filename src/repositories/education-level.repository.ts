import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {EducationLevel, EducationLevelRelations, SchoolEducationLevel} from '../models';
import {SchoolEducationLevelRepository} from './school-education-level.repository';

export class EducationLevelRepository extends DefaultCrudRepository<
  EducationLevel,
  typeof EducationLevel.prototype.education_level_id,
  EducationLevelRelations
> {

  public readonly schoolEducationLevels: HasManyRepositoryFactory<SchoolEducationLevel, typeof EducationLevel.prototype.education_level_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('SchoolEducationLevelRepository') protected schoolEducationLevelRepositoryGetter: Getter<SchoolEducationLevelRepository>,
  ) {
    super(EducationLevel, dataSource);
    this.schoolEducationLevels = this.createHasManyRepositoryFactoryFor('schoolEducationLevels', schoolEducationLevelRepositoryGetter,);
    this.registerInclusionResolver('schoolEducationLevels', this.schoolEducationLevels.inclusionResolver);
  }
}
