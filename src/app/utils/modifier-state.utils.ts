import { IFractal, Types } from '@types';
import { FractalState } from './fractal-state.utils';

export class ModifierState extends FractalState {
  override async navigate(fractal: IFractal | null): Promise<void> {
    await this.router.navigate([], {
      queryParams: { [Types.Modifier]: fractal?.cursor },
      queryParamsHandling: 'merge',
    });
  }
}
