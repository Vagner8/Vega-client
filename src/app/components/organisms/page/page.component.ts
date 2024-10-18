import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { StateService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  @Input() Pages = '';
  @Input() Modifiers = '';

  constructor(public ss: StateService) {}

  // ngOnInit(): void {
  //   console.log('🚀 ~ Pages:', this.Pages);
  //   console.log('🚀 ~ fs.root.find(this.Pages):', this.ss.root.find(this.Pages));
  // }

  // onClick(fractal: IFractal): void {
  //   this.set.add(fractal);
  // }

  // private start = (params: ParamMap) => {};
}
