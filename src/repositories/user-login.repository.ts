import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {UserLogin, UserLoginRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class UserLoginRepository extends DefaultCrudRepository<
  UserLogin,
  typeof UserLogin.prototype.user_login_id,
  UserLoginRelations
> {

  public readonly user: BelongsToAccessor<User, typeof UserLogin.prototype.user_login_id>;

  constructor(
    @inject('datasources.SchoolDatasource') dataSource: SchoolDatasourceDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserLogin, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
