import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {SchoolType, SchoolTypeRelations, School} from '../models';
import {SchoolRepository} from './school.repository';

export class SchoolTypeRepository extends DefaultCrudRepository<
  SchoolType,
  typeof SchoolType.prototype.school_type_id,
  SchoolTypeRelations
> {

  public readonly schools: HasManyRepositoryFactory<School, typeof SchoolType.prototype.school_type_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(SchoolType, dataSource);
    this.schools = this.createHasManyRepositoryFactoryFor('schools', schoolRepositoryGetter,);
    this.registerInclusionResolver('schools', this.schools.inclusionResolver);
  }
}
