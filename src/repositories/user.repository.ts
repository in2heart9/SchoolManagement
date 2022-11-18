import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {SchoolDatasourceDataSource} from '../datasources';
import {User, UserLog, UserLogin, UserRelations} from '../models';
import {UserLogRepository} from './user-log.repository';
import {UserLoginRepository} from './user-login.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.user_id,
  UserRelations
> {
  public readonly userLogs: HasManyRepositoryFactory<
    UserLog,
    typeof User.prototype.user_id
  >;

  public readonly userLogins: HasManyRepositoryFactory<
    UserLogin,
    typeof User.prototype.user_id
  >;

  constructor(
    @inject('datasources.SchoolDatasource')
    dataSource: SchoolDatasourceDataSource,
    @repository.getter('UserLogRepository')
    protected userLogRepositoryGetter: Getter<UserLogRepository>,
    @repository.getter('UserLoginRepository')
    protected userLoginRepositoryGetter: Getter<UserLoginRepository>,
  ) {
    super(User, dataSource);
    this.userLogins = this.createHasManyRepositoryFactoryFor(
      'userLogins',
      userLoginRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userLogins',
      this.userLogins.inclusionResolver,
    );
    this.userLogs = this.createHasManyRepositoryFactoryFor(
      'userLogs',
      userLogRepositoryGetter,
    );
    this.registerInclusionResolver('userLogs', this.userLogs.inclusionResolver);
  }

  async userLogin(username: string, password: string): Promise<User> {
    const sql =
      'select * from User where username = ' +
      '"' +
      username +
      '" and password = ' +
      '"' +
      password +
      '"';
    return <User>await this.execute(sql);
  }
}
