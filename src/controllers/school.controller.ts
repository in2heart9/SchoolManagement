import {Filter, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {School} from '../models';
import {SchoolRepository} from '../repositories';

export class SchoolController {
  constructor(
    @repository(SchoolRepository)
    public schoolRepository: SchoolRepository,
  ) {}

  @post('/schools')
  @response(200, {
    description: 'School model instance',
    content: {'application/json': {schema: getModelSchemaRef(School)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(School, {
            title: 'NewSchool',
            exclude: ['school_id'],
          }),
        },
      },
    })
    school: Omit<School, 'school_id'>,
  ): Promise<School> {
    return this.schoolRepository.create(school);
  }

  /*
  @get('/schools/count')
  @response(200, {
    description: 'School model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(School) where?: Where<School>): Promise<Count> {
    return this.schoolRepository.count(where);
  }
  */

  @get('/schools')
  @response(200, {
    description: 'Array of School model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(School, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(School) filter?: Filter<School>): Promise<School[]> {
    return this.schoolRepository.find(filter);
  }

  /*
  @patch('/schools')
  @response(200, {
    description: 'School PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(School, {partial: true}),
        },
      },
    })
    school: School,
    @param.where(School) where?: Where<School>,
  ): Promise<Count> {
    return this.schoolRepository.updateAll(school, where);
  }
  */

  /*
  @get('/schools/{id}')
  @response(200, {
    description: 'School model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(School, {exclude: 'where'})
    filter?: FilterExcludingWhere<School>,
  ): Promise<School> {
    return this.schoolRepository.findById(id, filter);
  }
  */

  @patch('/schools/{id}')
  @response(204, {
    description: 'School PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(School, {partial: true}),
        },
      },
    })
    school: School,
  ): Promise<void> {
    await this.schoolRepository.updateById(id, school);
  }

  /*
  @put('/schools/{id}')
  @response(204, {
    description: 'School PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() school: School,
  ): Promise<void> {
    await this.schoolRepository.replaceById(id, school);
  }
  */

  @del('/schools/{id}')
  @response(204, {
    description: 'School DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.schoolRepository.deleteById(id);
  }

  /*
  @get('/school-find-all')
  @response(200, {
    description: 'fetching school find all from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: false}),
      },
    },
  })
  async findAll(): Promise<School> {
    return await this.schoolRepository.findAll();
  }

  @get('/school-find-by-name/{school_name}')
  @response(200, {
    description: 'fetching school find by name from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByName(
    @param.path.string('school_name') school_name: string,
  ): Promise<School> {
    return await this.schoolRepository.findByName(school_name);
  }

  @get('/school-find-by-code/{school_code}')
  @response(200, {
    description: 'fetching school find by code from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByCode(
    @param.path.string('school_code') school_code: string,
  ): Promise<School> {
    return await this.schoolRepository.findByCode(school_code);
  }

  @get('/school-find-by-annual/{annual}')
  @response(200, {
    description: 'fetching school find by annual from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByAnnual(
    @param.path.number('annual') annual: number,
  ): Promise<School> {
    return await this.schoolRepository.findByAnnual(annual);
  }

  @get('/school-find-by-status/{status}')
  @response(200, {
    description: 'fetching school find by status from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByStatus(
    @param.path.number('status') status: number,
  ): Promise<School> {
    return await this.schoolRepository.findByStatus(status);
  }

  @get('/school-find-by-affiliation_type/{affiliation_type_id}')
  @response(200, {
    description: 'fetching school find by affiliation type from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByAffiliationType(
    @param.path.number('affiliation_type_id') affiliation_type_id: number,
  ): Promise<School> {
    return await this.schoolRepository.findByAffiliationType(
      affiliation_type_id,
    );
  }

  @get('/school-find-by-affiliation/{affiliation_id}')
  @response(200, {
    description: 'fetching school find by affiliation from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByAffiliation(
    @param.path.number('affiliation_id') affiliation_id: number,
  ): Promise<School> {
    return await this.schoolRepository.findByAffiliation(affiliation_id);
  }

  @get('/school-find-by-province/{province_id}')
  @response(200, {
    description: 'fetching school find by province from db using query',
    content: {
      'application/json': {
        schema: getModelSchemaRef(School, {includeRelations: true}),
      },
    },
  })
  async findByProvince(
    @param.path.number('province_id') province_id: number,
  ): Promise<School> {
    return await this.schoolRepository.findByProvince(province_id);
  }
  */
}
