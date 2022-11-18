import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {Province, ProvinceRelations, District, School} from '../models';
import {DistrictRepository} from './district.repository';
import {SchoolRepository} from './school.repository';

export class ProvinceRepository extends DefaultCrudRepository<
  Province,
  typeof Province.prototype.province_id,
  ProvinceRelations
> {

  public readonly districts: HasManyRepositoryFactory<District, typeof Province.prototype.province_id>;

  public readonly schools: HasManyRepositoryFactory<School, typeof Province.prototype.province_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('DistrictRepository') protected districtRepositoryGetter: Getter<DistrictRepository>, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(Province, dataSource);
    this.schools = this.createHasManyRepositoryFactoryFor('schools', schoolRepositoryGetter,);
    this.registerInclusionResolver('schools', this.schools.inclusionResolver);
    this.districts = this.createHasManyRepositoryFactoryFor('districts', districtRepositoryGetter,);
    this.registerInclusionResolver('districts', this.districts.inclusionResolver);
  }
}
