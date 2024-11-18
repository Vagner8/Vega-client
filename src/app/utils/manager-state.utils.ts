import { Types } from '@types';
import { EventState } from './event-state.utils';

export class ManagerState extends EventState {
  override async navigate(state: string): Promise<void> {
    await this.router.navigate([], {
      queryParams: { [Types.Manager]: state },
      queryParamsHandling: 'merge',
    });
  }
}
