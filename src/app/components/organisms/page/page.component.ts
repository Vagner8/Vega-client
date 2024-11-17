import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { DataService, FractalService } from '@services';
import { combineLatest } from 'rxjs';
import { ModifierComponent } from '../modifier/modifier.component';
import { Events, IFractal, Types } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TableComponent, ModifierComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  @Input() Rows = '';
  @Input() Pages = '';
  @Input() Manager = '';
  @Input() Modifiers = '';

  constructor(
    public fs: FractalService,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([this.ds.get(), this.route.queryParamMap]).subscribe(async ([dto]) => {
      if (this.fs.page()) return;
      const root = this.fs.toFractal(dto);
      this.fs.pages = root.find(Types.Pages);
      this.fs.manager = root.find(Types.Manager);
      this.fs.modifiers = root.find(Types.Modifiers);

      this.fs.root.set(root);
      setTimeout(() => this.fs.page.set(root.find(this.Pages)));
      this.Rows && this.fs.rows.fractals.set(this.Rows.split(':').map(id => root.find(id)!));
      setTimeout(() =>
        this.fs.taps.set(this.fs[this.Rows || this.Modifiers ? 'modifiers' : 'pages'])
      );
      setTimeout(() => this.fs.managerEvent.set(this.Manager ? this.Manager : Events.Hold));
    });
  }

  async onRowClick(row: IFractal): Promise<void> {
    this.fs.rows.set(row);
    this.fs.taps.set(this.fs.modifiers);
    this.fs.managerEvent.set(Events.Click);
    const ids = this.fs.rows
      .fractals()
      .map(({ dto }) => dto.id)
      .join(':');
    this.router.navigate([], {
      queryParams: {
        [Types.Rows]: ids,
        [Types.Manager]: Events.Click,
      },
      queryParamsHandling: 'merge',
    });
  }
}
