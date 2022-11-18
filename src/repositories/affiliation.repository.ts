import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {Affiliation, AffiliationRelations, AffiliationType, ClaimExpense} from '../models';
import {AffiliationTypeRepository} from './affiliation-type.repository';
import {ClaimExpenseRepository} from './claim-expense.repository';

export class AffiliationRepository extends DefaultCrudRepository<
  Affiliation,
  typeof Affiliation.prototype.affiliation_id,
  AffiliationRelations
> {

  public readonly affiliation_type: BelongsToAccessor<AffiliationType, typeof Affiliation.prototype.affiliation_id>;

  public readonly claimExpenses: HasManyRepositoryFactory<ClaimExpense, typeof Affiliation.prototype.affiliation_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('AffiliationTypeRepository') protected affiliationTypeRepositoryGetter: Getter<AffiliationTypeRepository>, @repository.getter('ClaimExpenseRepository') protected claimExpenseRepositoryGetter: Getter<ClaimExpenseRepository>,
  ) {
    super(Affiliation, dataSource);
    this.claimExpenses = this.createHasManyRepositoryFactoryFor('claimExpenses', claimExpenseRepositoryGetter,);
    this.registerInclusionResolver('claimExpenses', this.claimExpenses.inclusionResolver);
    this.affiliation_type = this.createBelongsToAccessorFor('affiliation_type', affiliationTypeRepositoryGetter,);
    this.registerInclusionResolver('affiliation_type', this.affiliation_type.inclusionResolver);
  }
}
