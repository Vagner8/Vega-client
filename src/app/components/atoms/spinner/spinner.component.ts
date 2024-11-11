import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@mat';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent implements OnInit {
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  timeout$!: Observable<number>;

  ngOnInit(): void {
    this.timeout$ = interval().pipe(map(num => num * 100));
  }
}
