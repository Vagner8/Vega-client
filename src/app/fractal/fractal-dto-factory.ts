import { ControlsDto, FractalDto, FractalsDto } from '@types';
import { v4 } from 'uuid';
import { RequiredControlsDtoFactory } from './controls-dto-factory';

export class FractalDtoFactory implements FractalDto {
  id: string;
  controls: ControlsDto;
  fractals: FractalsDto | null;

  constructor(public parentId: string) {
    const id = v4();
    this.id = id;
    this.fractals = null;
    this.controls = RequiredControlsDtoFactory(id);
  }
}
