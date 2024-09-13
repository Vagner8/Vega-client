import { ControlsDto, IControls, Indicators } from '@types';

export class Controls implements IControls {
  name = this.data(Indicators.Fractal);
  icon = this.data(Indicators.Icon);
  sort = this.data(Indicators.Sort).split(':').filter(Boolean);

  constructor(private root: ControlsDto) {}

  data(indicator: string): string {
    return this.root[indicator]?.data || '';
  }
}
