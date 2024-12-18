import { Injectable } from '@angular/core';
import { IFractal } from '@types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService extends BaseService {
  async set(collection: IFractal): Promise<void> {
    this.$current.set(collection);
    await this.navigate({}, [collection.cursor]);
  }

  init({ root, Collections }: { root: IFractal; Collections: string }): void {
    this.$current.set(root.find(Collections));
  }
}
