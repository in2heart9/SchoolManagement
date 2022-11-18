import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {SchoolLog, SchoolLogRelations, School} from '../models';
import {SchoolRepository} from './school.repository';

export class SchoolLogRepository extends DefaultCrudRepository<
  SchoolLog,
  typeof SchoolLog.prototype.school_log_id,
  SchoolLogRelations
> {

  public readonly school: BelongsToAccessor<School, typeof SchoolLog.prototype.school_log_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(SchoolLog, dataSource);
    this.school = this.createBelongsToAccessorFor('school', schoolRepositoryGetter,);
    this.registerInclusionResolver('school', this.school.inclusionResolver);
  }
}
