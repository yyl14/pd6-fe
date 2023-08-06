import api from '../api';

const browseAllJudgmentJudgeCase = api.path('/judgment/{judgment_id}/judge-case').method('get').create();

export default browseAllJudgmentJudgeCase;
