import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { SuperComponent } from '@utils';
import { Fractals } from '@types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends SuperComponent implements OnInit {
  ngOnInit(): void {
    this.ds.get().subscribe(dto => {
      const root = this.fs.toFractal(dto);
      this.ls.lists = root.find(Fractals.Lists);
      this.mgr.manager = root.find(Fractals.Manager);
      this.ms.modifiers = root.find(Fractals.Modifiers);
      this.fs.root.set(root);
    });
  }
}
