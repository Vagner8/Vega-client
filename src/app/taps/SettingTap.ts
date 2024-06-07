import { ISettingTap, SettingTapNames, TapLocation, TapProps } from '@types';
import { Tap } from './Tap';

export class SettingTap extends Tap implements ISettingTap {
  location: TapLocation = 'settings';

  constructor(
    public name: SettingTapNames,
    props: TapProps,
  ) {
    super(props);
  }

  onClick = (): void => {
    this.setRec({ action: this.name });
    this.navigate();
  };
}
