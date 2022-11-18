import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {
  Affiliation,
  AffiliationType,
  AffiliationTypeRelations,
  School,
} from '../models';
import {AffiliationRepository} from './affiliation.repository';
import {SchoolRepository} from './school.repository';

export class AffiliationTypeRepository extends DefaultCrudRepository<
  AffiliationType,
  typeof AffiliationType.prototype.affiliation_type_id,
  AffiliationTypeRelations
> {
  public readonly schools: HasManyRepositoryFactory<
    School,
    typeof AffiliationType.prototype.affiliation_type_id
  >;

  public readonly affiliations: HasManyRepositoryFactory<
    Affiliation,
    typeof AffiliationType.prototype.affiliation_type_id
  >;

  constructor(
    @inject('datasources.SchoolDatasource')
    dataSource: SchoolDatasourceDataSource,
    @repository.getter('SchoolRepository')
    protected schoolRepositoryGetter: Getter<SchoolRepository>,
    @repository.getter('AffiliationRepository')
    protected affiliationRepositoryGetter: Getter<AffiliationRepository>,
  ) {
    super(AffiliationType, dataSource);
    this.affiliations = this.createHasManyRepositoryFactoryFor(
      'affiliations',
      affiliationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'affiliations',
      this.affiliations.inclusionResolver,
    );
    this.schools = this.createHasManyRepositoryFactoryFor(
      'schools',
      schoolRepositoryGetter,
    );
    this.registerInclusionResolver('schools', this.schools.inclusionResolver);
  }

  async findAffiliationTypeByName(
    affiliation_type_name: string,
  ): Promise<AffiliationType> {
    const sql =
      'select * from AffiliationType where affiliation_type_name = ' +
      '"' +
      affiliation_type_name +
      '"';
    return <AffiliationType>await this.execute(sql);
  }
}
