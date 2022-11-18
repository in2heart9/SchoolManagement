import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {District, DistrictRelations, Province, Subdistrict, School} from '../models';
import {ProvinceRepository} from './province.repository';
import {SubdistrictRepository} from './subdistrict.repository';
import {SchoolRepository} from './school.repository';

export class DistrictRepository extends DefaultCrudRepository<
  District,
  typeof District.prototype.district_id,
  DistrictRelations
> {

  public readonly province: BelongsToAccessor<Province, typeof District.prototype.district_id>;

  public readonly subdistricts: HasManyRepositoryFactory<Subdistrict, typeof District.prototype.district_id>;

  public readonly schools: HasManyRepositoryFactory<School, typeof District.prototype.district_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('ProvinceRepository') protected provinceRepositoryGetter: Getter<ProvinceRepository>, @repository.getter('SubdistrictRepository') protected subdistrictRepositoryGetter: Getter<SubdistrictRepository>, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(District, dataSource);
    this.schools = this.createHasManyRepositoryFactoryFor('schools', schoolRepositoryGetter,);
    this.registerInclusionResolver('schools', this.schools.inclusionResolver);
    this.subdistricts = this.createHasManyRepositoryFactoryFor('subdistricts', subdistrictRepositoryGetter,);
    this.registerInclusionResolver('subdistricts', this.subdistricts.inclusionResolver);
    this.province = this.createBelongsToAccessorFor('province', provinceRepositoryGetter,);
    this.registerInclusionResolver('province', this.province.inclusionResolver);
  }
}
