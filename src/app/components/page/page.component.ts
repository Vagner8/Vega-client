import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlDto } from '@types';
import { CreateComponent } from '../create/create.component';
import { HeaderComponent } from '../header/header.component';
import { TableComponent } from '../table/table.component';
import { MatrixService } from '@services';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    CreateComponent,
    TableComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  constructor(private matrix: MatrixService) {}

  get controls(): Signal<ControlDto[]> {
    return this.matrix.matricesControls;
  }
}
