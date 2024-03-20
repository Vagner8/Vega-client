import { Injectable, signal } from '@angular/core';
import {
  Entity,
  EntityGroup,
  EntitySateUnion,
  EntitySatesUnion,
  ProductEntity,
  UserEntity,
} from 'app/types/entity.types';
import { isProduct, isUser } from 'app/types/guards.types';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  readonly entities: EntityGroup = {
    users: [],
    products: [],
  };

  set(states: EntitySatesUnion): void {
    if (isUser(states)) this.entities.users = states.map(this._create);
    if (isProduct(states)) this.entities.products = states.map(this._create);
  }

  getUser(id: string): UserEntity | undefined {
    return this.entities.users.find((user) => user.id === id);
  }

  getProduct(id: string): ProductEntity | undefined {
    return this.entities.products.find((product) => product.id === id);
  }

  private _create = <T extends EntitySateUnion>(state: T): Entity<T> => {
    return {
      id: state.id,
      signal: signal(state),
      update(value) {
        this.signal.update((state) => ({ ...state, ...value }));
      },
    };
  };
}
