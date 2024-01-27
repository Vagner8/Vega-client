import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, ToolbarComponent } from '@components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
