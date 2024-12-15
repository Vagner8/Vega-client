import { inject, Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  $list = signal<IFractal | null>(null);
  lists!: IFractal;
  bs = inject(BaseService);

  async set(list: IFractal): Promise<void> {
    this.$list.set(list);
    await this.bs.navigate({}, [list.cursor]);
  }

  get list(): IFractal {
    const fractal = this.$list();
    if (!fractal) throw new Error(`List is ${fractal}`);
    return fractal;
  }

  init({ Lists }: { Lists: string }): void {
    this.$list.set(this.lists.find(Lists));
  }
}
