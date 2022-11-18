import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {ClassLevel, ClassLevelRelations, SchoolClassLevel, StudentStat} from '../models';
import {SchoolClassLevelRepository} from './school-class-level.repository';
import {StudentStatRepository} from './student-stat.repository';

export class ClassLevelRepository extends DefaultCrudRepository<
  ClassLevel,
  typeof ClassLevel.prototype.class_level_id,
  ClassLevelRelations
> {

  public readonly schoolClassLevels: HasManyRepositoryFactory<SchoolClassLevel, typeof ClassLevel.prototype.class_level_id>;

  public readonly studentStats: HasManyRepositoryFactory<StudentStat, typeof ClassLevel.prototype.class_level_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('SchoolClassLevelRepository') protected schoolClassLevelRepositoryGetter: Getter<SchoolClassLevelRepository>, @repository.getter('StudentStatRepository') protected studentStatRepositoryGetter: Getter<StudentStatRepository>,
  ) {
    super(ClassLevel, dataSource);
    this.studentStats = this.createHasManyRepositoryFactoryFor('studentStats', studentStatRepositoryGetter,);
    this.registerInclusionResolver('studentStats', this.studentStats.inclusionResolver);
    this.schoolClassLevels = this.createHasManyRepositoryFactoryFor('schoolClassLevels', schoolClassLevelRepositoryGetter,);
    this.registerInclusionResolver('schoolClassLevels', this.schoolClassLevels.inclusionResolver);
  }
}
