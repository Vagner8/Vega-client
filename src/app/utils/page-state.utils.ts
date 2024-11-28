import { Events, IFractal, Types } from '@types';
import { State } from './state.utils';

export class PageState extends State<IFractal> {
  override async navigate(fractal: IFractal | null): Promise<void> {
    await this.router.navigate(fractal ? [fractal.cursor] : [], {
      queryParams: { [Types.Manager]: Events.Click },
    });
  }
}
