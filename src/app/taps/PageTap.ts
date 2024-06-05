import { PageTapProps, TapPlaces } from '@types';
import { Tap } from './Tap';

export class PageTap extends Tap {
  override place: TapPlaces = 'pages';

  name: string;

  constructor(props: PageTapProps) {
    super(props);
    this.name = props.name;
  }

  override onClick(): void {
    this.rec.pages.set(this.name);
  }
}
