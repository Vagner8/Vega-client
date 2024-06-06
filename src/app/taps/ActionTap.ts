import { ActionTapNames, IActionTap, TapLocation, TapProps } from '@types';
import { Tap } from './Tap';

export class ActionTap extends Tap implements IActionTap {
  location: TapLocation = 'actions';

  constructor(public name: ActionTapNames, props: TapProps) {
    super(props);
  }

  onClick = (): void => {
    this.setRec({ action: this.name });
    this.navigate();
  };
}
