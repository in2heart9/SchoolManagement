import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {Province} from '../models';
import {ProvinceRepository} from '../repositories';

export class ProvinceController {
  constructor(
    @repository(ProvinceRepository)
    public provinceRepository: ProvinceRepository,
  ) {}

  /*
  @post('/provinces')
  @response(200, {
    description: 'Province model instance',
    content: {'application/json': {schema: getModelSchemaRef(Province)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {
            title: 'NewProvince',
            exclude: ['province_id'],
          }),
        },
      },
    })
    province: Omit<Province, 'province_id'>,
  ): Promise<Province> {
    return this.provinceRepository.create(province);
  }
  */

  /*
  @get('/provinces/count')
  @response(200, {
    description: 'Province model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Province) where?: Where<Province>,
  ): Promise<Count> {
    return this.provinceRepository.count(where);
  }
  */

  @get('/provinces')
  @response(200, {
    description: 'Array of Province model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Province, {includeRelations: false}),
        },
      },
    },
  })
  async find(
    @param.filter(Province) filter?: Filter<Province>,
  ): Promise<Province[]> {
    return this.provinceRepository.find({include: []});
  }

  /*
  @patch('/provinces')
  @response(200, {
    description: 'Province PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {partial: true}),
        },
      },
    })
    province: Province,
    @param.where(Province) where?: Where<Province>,
  ): Promise<Count> {
    return this.provinceRepository.updateAll(province, where);
  }
  */

  /*
  @get('/provinces/{id}')
  @response(200, {
    description: 'Province model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Province, {includeRelations: false}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Province, {exclude: 'where'}) filter?: FilterExcludingWhere<Province>
  ): Promise<Province> {
    return this.provinceRepository.findById(id, {include:[]});
  }
  */

  /*
  @patch('/provinces/{id}')
  @response(204, {
    description: 'Province PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {partial: true}),
        },
      },
    })
    province: Province,
  ): Promise<void> {
    await this.provinceRepository.updateById(id, province);
  }
  */

  /*
  @put('/provinces/{id}')
  @response(204, {
    description: 'Province PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() province: Province,
  ): Promise<void> {
    await this.provinceRepository.replaceById(id, province);
  }
  */

  /*
  @del('/provinces/{id}')
  @response(204, {
    description: 'Province DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.provinceRepository.deleteById(id);
  }
  */
}
