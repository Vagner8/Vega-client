import { ActionTapNames, ActionTapProps, TapPlaces } from '@types';
import { Tap } from './Tap';

export class ActionTap extends Tap {
  override place: TapPlaces = 'actions';

  name: ActionTapNames;

  constructor(props: ActionTapProps) {
    super(props);
    this.name = props.name;
  }


  override onClick(): void {
    this.rec.actions.set(this.name);
  }
}