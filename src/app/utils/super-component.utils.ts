import { inject } from '@angular/core';
import { EventService, FractalService, SettingsService } from '@services';

export abstract class SuperComponent {
  es = inject(EventService);
  fs = inject(FractalService);
  ss = inject(SettingsService);
}
