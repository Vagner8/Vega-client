import { Component, OnInit } from '@angular/core';
import {
  DrawerComponent,
  HeaderComponent,
  ToolbarComponent,
} from '@components';
import { RouterOutlet } from '@angular/router';
import { MatrixService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DrawerComponent, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private matrix: MatrixService) {}

  ngOnInit(): void {
    this.matrix.fetch.subscribe(this.matrix.onInit);
  }
}
