import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { MapService } from '@services';
import { SuperComponent } from '@utils';
import { Types } from '@types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends SuperComponent implements OnInit {
  ms = inject(MapService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = this.ms.toFractal(dto);
      this.fs.pages = root.find(Types.Lists);
      this.fs.manager = root.find(Types.Manager);
      this.fs.modifiers = root.find(Types.Modifiers);
      this.fs.root.set(root);
    });
  }
}
