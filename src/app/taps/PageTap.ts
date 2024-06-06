import { IPageTap, TapLocation, TapProps } from '@types';
import { Tap } from './Tap';

export class PageTap extends Tap implements IPageTap {
  location: TapLocation = 'pages';

  constructor(public name: string, props: TapProps) {
    super(props);
  }

  onClick = (): void => {
    this.setRec({ page: this.name, action: null });
    this.navigate();
  };
}
