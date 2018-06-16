import { DB1 } from '@modules/Database';
import {getCustomRepository} from 'typeorm';
import {DefinitionRepository} from '@src/repositories/DefinitionRepository';
import DefinitionAddParam from '@models/definition/DefinitionAddParam';
import DefinitionAddResult from '@models/definition/DefinitionAddResult';
import {TermRepository} from '@src/repositories/TermRepository';
import Term from '@entities/Term';
import Vote from '@entities/Vote';
import User from '@entities/User';

export default class DefinitionService {
  public static async addDefinition(param: DefinitionAddParam) {
    try {
      const termRepo = getCustomRepository(TermRepository, DB1);
      const checkTerm = await termRepo.findAndCount({label: param.definition.term.label});
      if (checkTerm[1] === 0) {
        const term = new Term();
        term.label = param.definition.term.label;
        term.status = 'N';
        const insertedTerm = await termRepo.save(term)
        param.definition.term.id = insertedTerm.id;
      } else {
        param.definition.term.id = checkTerm[0][0].id;
      }

      /// temp user setting
      const user = new User();
      user.id = 1;
      param.definition.user = user;

      const vote = new Vote();
      vote.downVoteCount = 0;
      vote.upVoteCount = 0;
      vote.targetType = 'D';
      vote.status = 'N';

      param.definition.vote = vote;
      const definitionRepo = getCustomRepository(DefinitionRepository, DB1);
      const data = await definitionRepo.save(param.definition);
      return new DefinitionAddResult({
        definition: data
      });
    } catch (err) {

    }
  }
};