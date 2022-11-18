import {Filter, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {UserLog} from '../models';
import {UserLogRepository} from '../repositories';

export class UserLogController {
  constructor(
    @repository(UserLogRepository)
    public userLogRepository: UserLogRepository,
  ) {}

  @post('/user-logs')
  @response(200, {
    description: 'UserLog model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserLog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserLog, {
            title: 'NewUserLog',
            exclude: ['user_log_id'],
          }),
        },
      },
    })
    userLog: Omit<UserLog, 'user_log_id'>,
  ): Promise<UserLog> {
    return this.userLogRepository.create(userLog);
  }

  /*
  @get('/user-logs/count')
  @response(200, {
    description: 'UserLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserLog) where?: Where<UserLog>,
  ): Promise<Count> {
    return this.userLogRepository.count(where);
  }
  */

  @get('/user-logs')
  @response(200, {
    description: 'Array of UserLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserLog) filter?: Filter<UserLog>,
  ): Promise<UserLog[]> {
    return this.userLogRepository.find(filter);
  }

  /*
  @patch('/user-logs')
  @response(200, {
    description: 'UserLog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserLog, {partial: true}),
        },
      },
    })
    userLog: UserLog,
    @param.where(UserLog) where?: Where<UserLog>,
  ): Promise<Count> {
    return this.userLogRepository.updateAll(userLog, where);
  }
  */

  /*
  @get('/user-logs/{id}')
  @response(200, {
    description: 'UserLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserLog, {exclude: 'where'}) filter?: FilterExcludingWhere<UserLog>
  ): Promise<UserLog> {
    return this.userLogRepository.findById(id, filter);
  }
  */

  /*
  @patch('/user-logs/{id}')
  @response(204, {
    description: 'UserLog PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserLog, {partial: true}),
        },
      },
    })
    userLog: UserLog,
  ): Promise<void> {
    await this.userLogRepository.updateById(id, userLog);
  }
  */

  /*
  @put('/user-logs/{id}')
  @response(204, {
    description: 'UserLog PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userLog: UserLog,
  ): Promise<void> {
    await this.userLogRepository.replaceById(id, userLog);
  }

  @del('/user-logs/{id}')
  @response(204, {
    description: 'UserLog DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userLogRepository.deleteById(id);
  }
  */
}
