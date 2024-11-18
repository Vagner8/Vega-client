import { IFractal } from '@types';
import { State } from './state.utils';

export abstract class FractalState extends State<IFractal, IFractal> {
  async set(fractal: IFractal | null): Promise<void> {
    this.signal.set(fractal);
    this.navigate(fractal);
  }
}
