import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '@services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _state: StateService) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe(this._state.paramMap.set);
  }
}
