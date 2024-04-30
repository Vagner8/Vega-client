import { Component } from '@angular/core';
import {
  DrawerComponent,
  HeaderComponent,
  ToolbarComponent,
} from '@components';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
    DrawerComponent,
    ToolbarComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
