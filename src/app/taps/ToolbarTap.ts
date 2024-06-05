import { TapPlaces, ToolbarTapNames, ToolbarTapProps } from '@types';
import { Tap } from './Tap';

export class ToolbarTap extends Tap {
  override place: TapPlaces = 'toolbar';

  name: ToolbarTapNames;

  constructor(props: ToolbarTapProps) {
    super(props);
    this.name = props.name;
  }

  override onClick(): void {
    this.rec.toolbar.set(this.name);
  }
}
