import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { TableComponent } from '../table/table.component';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatrixService } from '@services';
import { HttpClient } from '@angular/common/http';
import { MatrixApi, MatrixDto, ResponseDto } from '@types';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  private subscriptions: Subscription[] = [];

  constructor(private matrix: MatrixService, private http: HttpClient) {}

  ngOnInit() {
    // this.http
    //   .get<ResponseDto<MatrixDto[]>>(MatrixApi.Many)
    //   .subscribe((responseDto) => this.matrix.init(responseDto.data));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
