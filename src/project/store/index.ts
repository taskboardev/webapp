import { ProjectData } from '@taskboar/model';
import * as actions from './actions';
import * as selectors from './selectors';
import * as hooks from './hooks';

export type State = ProjectData;
export { actions, selectors, hooks };
export * from './StoreProvider';
