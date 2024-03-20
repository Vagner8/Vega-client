import { WritableSignal } from '@angular/core';

export type EntityType = keyof EntityGroup;

export interface UserEntity extends Entity<UserState> {}
export interface ProductEntity extends Entity<ProductState> {}

export interface Entity<T> {
  id: string;
  signal: WritableSignal<T>;
  update(value: Partial<T>): void;
}

export interface EntityGroup {
  users: UserEntity[];
  products: ProductEntity[];
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ProductState {
  id: string;
  name: string;
  price: string;
}

export type EntityUnion = UserEntity | ProductEntity;
export type EntitiesUnion = UserEntity[] | ProductEntity[];
export type EntitySateUnion = UserState | ProductState;
export type EntitySatesUnion = UserState[] | ProductState[];
