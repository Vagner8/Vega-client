import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, MapService } from '@services';
import { SuperComponent } from '@utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends SuperComponent implements OnInit {
  ms = inject(MapService);
  ds = inject(DataService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => this.fs.root.set(this.ms.toFractal(dto)));
  }
}
