import { inject, Injectable, signal } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  $collection = signal<IFractal | null>(null);
  collections!: IFractal;
  bs = inject(BaseService);

  async set(collection: IFractal): Promise<void> {
    this.$collection.set(collection);
    await this.bs.navigate({}, [collection.cursor]);
  }

  get collection(): IFractal {
    const fractal = this.$collection();
    if (!fractal) throw new Error(`List is ${fractal}`);
    return fractal;
  }

  init({ Collections }: { Collections: string }): void {
    this.$collection.set(this.collections.find(Collections));
  }
}
