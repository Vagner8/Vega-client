import { Injectable, computed, signal } from '@angular/core';
import { ControlDto, LineDto, MatrixDto, } from '@types';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  matrices = signal<MatrixDto[]>([]);
  matricesControls = computed<ControlDto[]>(() => this.getMatricesControls());
  lines = computed<LineDto[]>(() => this.getLines());
  linesControls = computed<ControlDto[]>(() => this.getLinesControls());

  private getMatricesControls(): ControlDto[] {
    return this.matrices().map(matrix => matrix.controls).flat();
  }

  private getLines(): LineDto[] {
    return this.matrices().map(matrix => matrix.lines).flat();
  }

  private getLinesControls(): ControlDto[] {
    return this.lines().map(line => line.Controls).flat();
  }
}
