import {Filter, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SchoolLog} from '../models';
import {SchoolLogRepository} from '../repositories';

export class SchoolLogController {
  constructor(
    @repository(SchoolLogRepository)
    public schoolLogRepository: SchoolLogRepository,
  ) {}

  @post('/school-logs')
  @response(200, {
    description: 'SchoolLog model instance',
    content: {'application/json': {schema: getModelSchemaRef(SchoolLog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolLog, {
            title: 'NewSchoolLog',
            exclude: ['school_log_id'],
          }),
        },
      },
    })
    schoolLog: Omit<SchoolLog, 'school_log_id'>,
  ): Promise<SchoolLog> {
    return this.schoolLogRepository.create(schoolLog);
  }

  /*
  @get('/school-logs/count')
  @response(200, {
    description: 'SchoolLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SchoolLog) where?: Where<SchoolLog>,
  ): Promise<Count> {
    return this.schoolLogRepository.count(where);
  }
  */

  @get('/school-logs')
  @response(200, {
    description: 'Array of SchoolLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SchoolLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SchoolLog) filter?: Filter<SchoolLog>,
  ): Promise<SchoolLog[]> {
    return this.schoolLogRepository.find(filter);
  }

  /*
  @patch('/school-logs')
  @response(200, {
    description: 'SchoolLog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolLog, {partial: true}),
        },
      },
    })
    schoolLog: SchoolLog,
    @param.where(SchoolLog) where?: Where<SchoolLog>,
  ): Promise<Count> {
    return this.schoolLogRepository.updateAll(schoolLog, where);
  }
  */

  /*
  @get('/school-logs/{id}')
  @response(200, {
    description: 'SchoolLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SchoolLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SchoolLog, {exclude: 'where'}) filter?: FilterExcludingWhere<SchoolLog>
  ): Promise<SchoolLog> {
    return this.schoolLogRepository.findById(id, filter);
  }
  */

  /*
  @patch('/school-logs/{id}')
  @response(204, {
    description: 'SchoolLog PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolLog, {partial: true}),
        },
      },
    })
    schoolLog: SchoolLog,
  ): Promise<void> {
    await this.schoolLogRepository.updateById(id, schoolLog);
  }
  */

  /*
  @put('/school-logs/{id}')
  @response(204, {
    description: 'SchoolLog PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() schoolLog: SchoolLog,
  ): Promise<void> {
    await this.schoolLogRepository.replaceById(id, schoolLog);
  }

  @del('/school-logs/{id}')
  @response(204, {
    description: 'SchoolLog DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.schoolLogRepository.deleteById(id);
  }
  */
}
