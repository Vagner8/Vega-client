import { IFractal } from '@types';
import { FractalState } from './fractal-state.utils';

export class PageState extends FractalState {
  override async navigate(fractal: IFractal | null): Promise<void> {
    await this.router.navigate([fractal?.cursor]);
  }
}
