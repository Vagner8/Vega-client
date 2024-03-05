import { BtnType } from './btn.types';

const mock: Record<BtnType, string> = {
  active: '',
  navigation: '',
  settings: '',
  toolbar: '',
};

export const isKeyofBtnGroup = (value: string): value is BtnType => {
  return Object.keys(mock).includes(value);
};
