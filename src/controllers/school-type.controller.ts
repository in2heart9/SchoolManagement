import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {SchoolType} from '../models';
import {SchoolTypeRepository} from '../repositories';

export class SchoolTypeController {
  constructor(
    @repository(SchoolTypeRepository)
    public schoolTypeRepository: SchoolTypeRepository,
  ) {}

  /*
  @post('/school-types')
  @response(200, {
    description: 'SchoolType model instance',
    content: {'application/json': {schema: getModelSchemaRef(SchoolType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolType, {
            title: 'NewSchoolType',
            exclude: ['school_type_id'],
          }),
        },
      },
    })
    schoolType: Omit<SchoolType, 'school_type_id'>,
  ): Promise<SchoolType> {
    return this.schoolTypeRepository.create(schoolType);
  }
  */

  /*
  @get('/school-types/count')
  @response(200, {
    description: 'SchoolType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SchoolType) where?: Where<SchoolType>,
  ): Promise<Count> {
    return this.schoolTypeRepository.count(where);
  }
  */

  @get('/school-types')
  @response(200, {
    description: 'Array of SchoolType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SchoolType, {includeRelations: false}),
        },
      },
    },
  })
  async find(
    @param.filter(SchoolType) filter?: Filter<SchoolType>,
  ): Promise<SchoolType[]> {
    //return this.schoolTypeRepository.find(filter);
    return this.schoolTypeRepository.find({include: []});
  }

  /*
  @patch('/school-types')
  @response(200, {
    description: 'SchoolType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolType, {partial: true}),
        },
      },
    })
    schoolType: SchoolType,
    @param.where(SchoolType) where?: Where<SchoolType>,
  ): Promise<Count> {
    return this.schoolTypeRepository.updateAll(schoolType, where);
  }
  */

  /*
  @get('/school-types/{id}')
  @response(200, {
    description: 'SchoolType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SchoolType, {includeRelations: false}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SchoolType, {exclude: 'where'}) filter?: FilterExcludingWhere<SchoolType>
  ): Promise<SchoolType> {
    //return this.schoolTypeRepository.findById(id, filter);
    return this.schoolTypeRepository.findById(id, {include:[]});
  }
  */

  /*
  @patch('/school-types/{id}')
  @response(204, {
    description: 'SchoolType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolType, {partial: true}),
        },
      },
    })
    schoolType: SchoolType,
  ): Promise<void> {
    await this.schoolTypeRepository.updateById(id, schoolType);
  }
  */

  /*
  @put('/school-types/{id}')
  @response(204, {
    description: 'SchoolType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() schoolType: SchoolType,
  ): Promise<void> {
    await this.schoolTypeRepository.replaceById(id, schoolType);
  }
  */

  /*
  @del('/school-types/{id}')
  @response(204, {
    description: 'SchoolType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.schoolTypeRepository.deleteById(id);
  }
  */
}
