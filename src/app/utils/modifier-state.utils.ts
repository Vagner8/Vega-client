import { IFractal, Types } from '@types';
import { State } from './state.utils';

export class ModifierState extends State<IFractal> {
  override async navigate(fractal: IFractal | null): Promise<void> {
    await this.router.navigate([], {
      queryParams: { [Types.Modifier]: fractal?.cursor },
      queryParamsHandling: 'merge',
    });
  }
}
