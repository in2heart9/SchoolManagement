import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {ClaimExpense, ClaimExpenseRelations, Affiliation, School} from '../models';
import {AffiliationRepository} from './affiliation.repository';
import {SchoolRepository} from './school.repository';

export class ClaimExpenseRepository extends DefaultCrudRepository<
  ClaimExpense,
  typeof ClaimExpense.prototype.claim_expense_id,
  ClaimExpenseRelations
> {

  public readonly affiliation: BelongsToAccessor<Affiliation, typeof ClaimExpense.prototype.claim_expense_id>;

  public readonly school: BelongsToAccessor<School, typeof ClaimExpense.prototype.claim_expense_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('AffiliationRepository') protected affiliationRepositoryGetter: Getter<AffiliationRepository>, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(ClaimExpense, dataSource);
    this.school = this.createBelongsToAccessorFor('school', schoolRepositoryGetter,);
    this.registerInclusionResolver('school', this.school.inclusionResolver);
    this.affiliation = this.createBelongsToAccessorFor('affiliation', affiliationRepositoryGetter,);
    this.registerInclusionResolver('affiliation', this.affiliation.inclusionResolver);
  }
}
