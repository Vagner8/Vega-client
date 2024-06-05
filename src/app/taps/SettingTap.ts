import { SettingTapNames, SettingTapProps, TapPlaces } from "@types";
import { Tap } from "./Tap";

export class SettingTap extends Tap {
  override place: TapPlaces = 'settings';

  name: SettingTapNames;

  constructor(props: SettingTapProps) {
    super(props);
    this.name = props.name;
  }

  override onClick(): void {
    this.rec.settings.set(this.name);
  }
}