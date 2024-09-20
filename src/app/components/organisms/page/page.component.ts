import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from '@components/atoms';
import { FractalService, NavigateService, UnsubscribeService } from '@services';
import { IFractal } from '@types';
import { isEmpty, setToString } from '@utils';

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
  uid = this.us.register();
  items = new Set<string>();

  constructor(
    public fs: FractalService,
    private ns: NavigateService,
    private us: UnsubscribeService
  ) {}

  ngOnInit(): void {
    this.items = new Set(this.ns.itemList());
  }

  onClick({ id }: IFractal): void {
    this.ns.toItems(this.getItems(id));
  }

  private getItems(id: string): string | null {
    if (this.items.has(id)) this.items.delete(id);
    else this.items.add(id);
    return !isEmpty(this.items) ? setToString(this.items) : null;
  }
}
