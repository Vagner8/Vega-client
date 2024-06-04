import { TapPlaces } from "@types";
import { Tap } from "./Tap";

export class PageTap extends Tap {
  override place: TapPlaces = 'pages';

  override onClick(): void {
    this.rec.pages.set(this.name);
    this.address.page.set(this.name);
  }
}