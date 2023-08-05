import api from '../api';

export const browseAllJudgmentJudgeCase = api.path('/judgment/{judgment_id}/judge-case').method('get').create();
