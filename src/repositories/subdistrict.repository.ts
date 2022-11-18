import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {Subdistrict, SubdistrictRelations, District, School} from '../models';
import {DistrictRepository} from './district.repository';
import {SchoolRepository} from './school.repository';

export class SubdistrictRepository extends DefaultCrudRepository<
  Subdistrict,
  typeof Subdistrict.prototype.subdistrict_id,
  SubdistrictRelations
> {

  public readonly district: BelongsToAccessor<District, typeof Subdistrict.prototype.subdistrict_id>;

  public readonly schools: HasManyRepositoryFactory<School, typeof Subdistrict.prototype.subdistrict_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('DistrictRepository') protected districtRepositoryGetter: Getter<DistrictRepository>, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(Subdistrict, dataSource);
    this.schools = this.createHasManyRepositoryFactoryFor('schools', schoolRepositoryGetter,);
    this.registerInclusionResolver('schools', this.schools.inclusionResolver);
    this.district = this.createBelongsToAccessorFor('district', districtRepositoryGetter,);
    this.registerInclusionResolver('district', this.district.inclusionResolver);
  }
}
