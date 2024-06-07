import { IToolbarTap, TapLocation, TapProps, ToolbarTapNames } from '@types';
import { Tap } from './Tap';

export class ToolbarTap extends Tap implements IToolbarTap {
  location: TapLocation = 'toolbar';

  constructor(
    public name: ToolbarTapNames,
    props: TapProps,
  ) {
    super(props);
  }

  override onClick(): void {
    this.setRec({ toolbar: this.name });
  }
}
