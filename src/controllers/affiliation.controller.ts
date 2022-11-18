import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {Affiliation} from '../models';
import {AffiliationRepository} from '../repositories';

export class AffiliationController {
  constructor(
    @repository(AffiliationRepository)
    public affiliationRepository: AffiliationRepository,
  ) {}

  @get('/affiliations')
  @response(200, {
    description: 'Array of Affiliation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Affiliation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Affiliation) filter?: Filter<Affiliation>,
  ): Promise<Affiliation[]> {
    return this.affiliationRepository.find(filter);
  }

  /*
  @post('/affiliations')
  @response(200, {
    description: 'Affiliation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Affiliation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Affiliation, {
            title: 'NewAffiliation',
            exclude: ['affiliation_id'],
          }),
        },
      },
    })
    affiliation: Omit<Affiliation, 'affiliation_id'>,
  ): Promise<Affiliation> {
    return this.affiliationRepository.create(affiliation);
  }

  @get('/affiliations/count')
  @response(200, {
    description: 'Affiliation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Affiliation) where?: Where<Affiliation>,
  ): Promise<Count> {
    return this.affiliationRepository.count(where);
  }

  @patch('/affiliations')
  @response(200, {
    description: 'Affiliation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Affiliation, {partial: true}),
        },
      },
    })
    affiliation: Affiliation,
    @param.where(Affiliation) where?: Where<Affiliation>,
  ): Promise<Count> {
    return this.affiliationRepository.updateAll(affiliation, where);
  }

  @get('/affiliations/{id}')
  @response(200, {
    description: 'Affiliation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Affiliation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Affiliation, {exclude: 'where'}) filter?: FilterExcludingWhere<Affiliation>
  ): Promise<Affiliation> {
    return this.affiliationRepository.findById(id, filter);
  }

  @patch('/affiliations/{id}')
  @response(204, {
    description: 'Affiliation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Affiliation, {partial: true}),
        },
      },
    })
    affiliation: Affiliation,
  ): Promise<void> {
    await this.affiliationRepository.updateById(id, affiliation);
  }

  @put('/affiliations/{id}')
  @response(204, {
    description: 'Affiliation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() affiliation: Affiliation,
  ): Promise<void> {
    await this.affiliationRepository.replaceById(id, affiliation);
  }

  @del('/affiliations/{id}')
  @response(204, {
    description: 'Affiliation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.affiliationRepository.deleteById(id);
  }
  */
}
