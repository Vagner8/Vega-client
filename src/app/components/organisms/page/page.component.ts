import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { FractalService } from '@services';
import { IFractal } from '@types';
import { StoreService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  @Input() Pages = '';
  @Input() Modifiers = '';
  set = new Set<IFractal>();

  constructor(
    public fs: FractalService,
    public ss: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(this.start);
  }

  onClick(fractal: IFractal): void {
    this.set.add(fractal);
  }

  private start = (params: ParamMap) => {};
}
