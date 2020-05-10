import { ProjectData } from '@taskboar/model';
import * as actions from './actions';
import * as selectors from './selectors';

export type State = ProjectData;
export { actions, selectors };
export * from './StoreProvider';
