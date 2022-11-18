import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {UserLog, UserLogRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UserLogRepository extends DefaultCrudRepository<
  UserLog,
  typeof UserLog.prototype.user_log_id,
  UserLogRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserLog.prototype.user_log_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserLog, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
