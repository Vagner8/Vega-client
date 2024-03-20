import { EntitySatesUnion, ProductState, UserState } from './entity.types';

export const hasEntityOwnProperty = (
  states: EntitySatesUnion,
  prop: string
): boolean => {
  return Object.prototype.hasOwnProperty.call(states[0], prop);
};

export const isUser = (states: EntitySatesUnion): states is UserState[] => {
  return hasEntityOwnProperty(states, 'email');
};

export const isProduct = (
  states: EntitySatesUnion
): states is ProductState[] => {
  return hasEntityOwnProperty(states, 'price');
};
