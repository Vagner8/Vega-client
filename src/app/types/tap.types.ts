import { MANAGER_CLICK_TYPE } from '@constants';

export type ManagerClickType = (typeof MANAGER_CLICK_TYPE)[keyof typeof MANAGER_CLICK_TYPE];
