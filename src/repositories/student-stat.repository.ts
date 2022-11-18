import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {StudentStat, StudentStatRelations, ClassLevel, School} from '../models';
import {ClassLevelRepository} from './class-level.repository';
import {SchoolRepository} from './school.repository';

export class StudentStatRepository extends DefaultCrudRepository<
  StudentStat,
  typeof StudentStat.prototype.student_stat_id,
  StudentStatRelations
> {

  public readonly class_level: BelongsToAccessor<ClassLevel, typeof StudentStat.prototype.student_stat_id>;

  public readonly school: BelongsToAccessor<School, typeof StudentStat.prototype.student_stat_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('ClassLevelRepository') protected classLevelRepositoryGetter: Getter<ClassLevelRepository>, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(StudentStat, dataSource);
    this.school = this.createBelongsToAccessorFor('school', schoolRepositoryGetter,);
    this.registerInclusionResolver('school', this.school.inclusionResolver);
    this.class_level = this.createBelongsToAccessorFor('class_level', classLevelRepositoryGetter,);
    this.registerInclusionResolver('class_level', this.class_level.inclusionResolver);
  }
}
