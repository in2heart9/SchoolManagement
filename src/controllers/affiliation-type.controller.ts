import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {AffiliationType} from '../models';
import {AffiliationTypeRepository} from '../repositories';

export class AffiliationTypeController {
  constructor(
    @repository(AffiliationTypeRepository)
    public affiliationTypeRepository: AffiliationTypeRepository,
  ) {}

  /*
  @post('/affiliation-types')
  @response(200, {
    description: 'AffiliationType model instance',
    content: {'application/json': {schema: getModelSchemaRef(AffiliationType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AffiliationType, {
            title: 'NewAffiliationType',
            exclude: ['affiliation_type_id'],
          }),
        },
      },
    })
    affiliationType: Omit<AffiliationType, 'affiliation_type_id'>,
  ): Promise<AffiliationType> {
    return this.affiliationTypeRepository.create(affiliationType);
  }
  */

  /*
  @get('/affiliation-types/count')
  @response(200, {
    description: 'AffiliationType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AffiliationType) where?: Where<AffiliationType>,
  ): Promise<Count> {
    return this.affiliationTypeRepository.count(where);
  }
  */

  @get('/affiliation-types')
  @response(200, {
    description: 'Array of AffiliationType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AffiliationType, {includeRelations: false}),
        },
      },
    },
  })
  async find(
    @param.filter(AffiliationType) filter?: Filter<AffiliationType>,
  ): Promise<AffiliationType[]> {
    //return this.affiliationTypeRepository.find(filter);
    return this.affiliationTypeRepository.find(filter);
  }

  /*
  @get('/affiliation-type')
  @response(200, {
    description: 'fetching affiliation-type from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AffiliationType, {includeRelations: false}),
      },
    },
  })
  async findAffiliationTypeByName(
    @param.query.string('affiliation_type_name') affiliation_type_name: string,
  ): Promise<AffiliationType> {
    return await this.affiliationTypeRepository.findAffiliationTypeByName(
      affiliation_type_name,
    );
  }
  */

  /*
  @patch('/affiliation-types')
  @response(200, {
    description: 'AffiliationType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AffiliationType, {partial: true}),
        },
      },
    })
    affiliationType: AffiliationType,
    @param.where(AffiliationType) where?: Where<AffiliationType>,
  ): Promise<Count> {
    return this.affiliationTypeRepository.updateAll(affiliationType, where);
  }
  */

  /*
  @get('/affiliation-types/{id}')
  @response(200, {
    description: 'AffiliationType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AffiliationType, {includeRelations: false}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AffiliationType, {exclude: 'where'})
    filter?: FilterExcludingWhere<AffiliationType>,
  ): Promise<AffiliationType> {
    //return this.affiliationTypeRepository.findById(id, filter);
    return this.affiliationTypeRepository.findById(id, {include: []});
  }
  */

  /*
  @patch('/affiliation-types/{id}')
  @response(204, {
    description: 'AffiliationType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AffiliationType, {partial: true}),
        },
      },
    })
    affiliationType: AffiliationType,
  ): Promise<void> {
    await this.affiliationTypeRepository.updateById(id, affiliationType);
  }
  */

  /*
  @put('/affiliation-types/{id}')
  @response(204, {
    description: 'AffiliationType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() affiliationType: AffiliationType,
  ): Promise<void> {
    await this.affiliationTypeRepository.replaceById(id, affiliationType);
  }
  */

  /*
  @del('/affiliation-types/{id}')
  @response(204, {
    description: 'AffiliationType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.affiliationTypeRepository.deleteById(id);
  }
  */
}
