import { Types } from '@types';
import { State } from './state.utils';

export class ManagerState extends State<string> {
  override async navigate(state: string): Promise<void> {
    await this.router.navigate([], {
      queryParams: { [Types.Manager]: state },
      queryParamsHandling: 'merge',
    });
  }
}
