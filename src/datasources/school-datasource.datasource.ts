import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'SchoolDatasource',
  connector: 'mysql',
  url: '',
  host: '150.95.30.20',
  port: 33306,
  user: 'root',
  password: 'KidsDev',
  database: 'schooldb'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SchoolDatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'SchoolDatasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.SchoolDatasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
