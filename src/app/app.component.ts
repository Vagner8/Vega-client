import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, ToolbarComponent } from '@components';
import { MatrixService, StateService, TapService } from '@services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatrixApi, ResponseDto } from './types/http.types';
import { MatrixDto } from './types/dto.types';
import { Subscription } from 'rxjs';
import { Tap, TapPlace } from './types/tap.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, DrawerComponent, ToolbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private state: StateService,
    private matrix: MatrixService,
    private http: HttpClient,
    private tap: TapService
  ) {}

  ngOnInit(): void {
    this.http
      .get<ResponseDto<MatrixDto[]>>(MatrixApi.Many)
      .subscribe(this.setMatrices);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  get error() {
    return this.state.error;
  }

  private setMatrices = (responseDto: ResponseDto<MatrixDto[]>) => {
    this.matrix.matrices.set(responseDto.data);
    this.tap.taps.set(TapPlace.Pages, [
      ...(this.tap.taps.get(TapPlace.Pages) || []),
      ...this.setPageTaps(),
    ]);
  };

  private setPageTaps = (): Tap[] => {
    return this.matrix
      .matricesControls()
      .map((control) => {
        return this.tap
          .setPageTap(control.value)
          .setState({ icon: 'apps' })
          .build();
      })
      .flat();
  };
}
