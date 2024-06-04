import { TapPlaces } from "@types";
import { Tap } from "./Tap";

export class ToolbarTap extends Tap {
  override place: TapPlaces = 'toolbar';

  override onClick(): void {
    this.rec.toolbar.set(this.name);
  }
}