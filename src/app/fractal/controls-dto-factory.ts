import { FractalTypes, SplitebleIndicators, Indicators, ControlDto, Fractal, ControlInput, ControlsDto } from '@types';
import { OrganizerControlDtoFactory, SelectControlDtoFactory, TextControlDtoFactory } from './control-dto-factory';
import { v4 } from 'uuid';

export const RequiredControlsDtoFactory = (id: string): ControlsDto => ({
  [SplitebleIndicators.Type]: SelectControlDtoFactory({
    data: Object.values(FractalTypes).join(':'),
    parentId: id,
    indicator: SplitebleIndicators.Type,
  }),
});

export const CategoryControlsDtoFactory = (id: string): ControlDto[] => [
  TextControlDtoFactory({ parentId: id, indicator: Indicators.Cursor }),
  OrganizerControlDtoFactory({ parentId: id, indicator: SplitebleIndicators.Sort }),
];

export const CollectionControlsDtoFactory = (id: string): ControlDto[] => [
  TextControlDtoFactory({ parentId: id, indicator: Indicators.Cursor }),
  TextControlDtoFactory({ parentId: id, indicator: Indicators.Icon }),
  OrganizerControlDtoFactory({ parentId: id, indicator: SplitebleIndicators.Columns }),
];

export const ItemControlsDtoFactory = (id: string, collection: Fractal): ControlDto[] => {
  if (collection.controlsArray.length === 0) {
    return collection.split(SplitebleIndicators.Columns).map(column => {
      return {
        id: v4(),
        data: '',
        input: ControlInput.New,
        parentId: id,
        indicator: column,
      };
    });
  } else {
    return collection.fractalsArray[0].controlsArray.map(control => {
      return {
        ...control,
        id: v4(),
        parentId: id,
        data: control.input === ControlInput.Text ? '' : control.data,
      };
    });
  }
};
