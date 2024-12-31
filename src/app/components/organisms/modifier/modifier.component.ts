import { Component, inject } from '@angular/core';
import { FormCardComponent } from '@components/molecules';
import { MatButtonModule, MatCardModule } from '@mat';
import { UpdateService } from '@services';

@Component({
  selector: 'app-modifier',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FormCardComponent],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss',
})
export class ModifierComponent {
  us = inject(UpdateService);
}
