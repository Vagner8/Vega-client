import { TapPlaces } from "@types";
import { Tap } from "./Tap";

export class SettingTap extends Tap {
  override place: TapPlaces = 'settings';

  override onClick(): void {
    this.rec.settings.set(this.name);
    this.address.action.set(this.name);
  }
}