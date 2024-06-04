import { TapPlaces } from '@types';
import { Tap } from './Tap';

export class ActionTap extends Tap {
  override place: TapPlaces = 'actions';

  override onClick(): void {
    this.rec.actions.set(this.name);
    this.address.action.set(this.name);
  }
}