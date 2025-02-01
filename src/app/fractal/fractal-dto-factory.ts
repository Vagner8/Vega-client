import {
  ControlInputs,
  ControlsDto,
  Fractal,
  FractalDto,
  FractalsDto,
  AppTypes,
  Indicators,
  SplitIndicators,
} from '@types';
import { v4 } from 'uuid';

export class FractalDtoFactory implements FractalDto {
  id: string;
  parentId: string;
  controls: ControlsDto;
  fractals: FractalsDto | null;

  constructor(parent: Fractal) {
    this.id = v4();
    this.parentId = parent.dto.id;
    this.fractals = null;

    this.controls = parent.has(SplitIndicators.Sort) ? this.itemControls(this.id, parent) : this.groupControls(this.id);
  }

  private groupControls(id: string): ControlsDto {
    return {
      [Indicators.Type]: {
        id: v4(),
        data: `${AppTypes.Entity}:${AppTypes.Collection}`,
        input: ControlInputs.Select,
        parentId: id,
        indicator: Indicators.Type,
      },
    };
  }

  private itemControls(id: string, collection: Fractal): ControlsDto {
    if (collection.fractalsArray.length === 0) {
      return collection.splitData(SplitIndicators.Sort).reduce((acc: ControlsDto, column) => {
        acc[column] = {
          id: v4(),
          data: '',
          input: ControlInputs.New,
          parentId: id,
          indicator: column,
        };
        return acc;
      }, {});
    } else {
      const copy: ControlsDto = {};

      for (const indicator in collection.fractalsArray[0].dto.controls) {
        const control = collection.fractalsArray[0].dto.controls[indicator];
        copy[indicator] = {
          ...control,
          id: v4(),
          parentId: id,
          data: control.input === ControlInputs.Text ? '' : control.data,
        };
      }

      return copy;
    }
  }
}
