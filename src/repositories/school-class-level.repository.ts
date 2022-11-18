import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {SchoolClassLevel, SchoolClassLevelRelations, ClassLevel, School} from '../models';
import {ClassLevelRepository} from './class-level.repository';
import {SchoolRepository} from './school.repository';

export class SchoolClassLevelRepository extends DefaultCrudRepository<
  SchoolClassLevel,
  typeof SchoolClassLevel.prototype.school_class_level_id,
  SchoolClassLevelRelations
> {

  public readonly class_level: BelongsToAccessor<ClassLevel, typeof SchoolClassLevel.prototype.school_class_level_id>;

  public readonly school: BelongsToAccessor<School, typeof SchoolClassLevel.prototype.school_class_level_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('ClassLevelRepository') protected classLevelRepositoryGetter: Getter<ClassLevelRepository>, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(SchoolClassLevel, dataSource);
    this.school = this.createBelongsToAccessorFor('school', schoolRepositoryGetter,);
    this.registerInclusionResolver('school', this.school.inclusionResolver);
    this.class_level = this.createBelongsToAccessorFor('class_level', classLevelRepositoryGetter,);
    this.registerInclusionResolver('class_level', this.class_level.inclusionResolver);
  }
}
