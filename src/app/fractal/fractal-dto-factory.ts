import { ControlsDto, FractalDto, FractalsDto } from '@types';
import { v4 } from 'uuid';

export class FractalDtoFactory implements FractalDto {
  id: string;
  fractals: FractalsDto | null;

  constructor(
    public parentId: string,
    public controls: ControlsDto
  ) {
    const id = v4();
    this.id = id;
    this.fractals = null;
  }
}
