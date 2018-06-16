import ApiURL from '@constants/ApiURL';
import * as UserAction from './userAction';
import HttpMethod from '@constants/HttpMethod';

export default [
  {
    action: UserAction.postUserNew,
    method: HttpMethod.POST,
    path: ApiURL.USER_NEW,
  },
  {
    action: UserAction.postSessionNew,
    method: HttpMethod.POST,
    path: ApiURL.SESSION_NEW,
  },
];