import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule } from '@mat';
import { CollectionControlMenu, ControlMenu, Fractal } from '@types';
import { FormComponent } from '../form/form.component';
import { TapDirective } from '@directives';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [MatCardModule, FormComponent, MatButtonModule, MatMenuModule, MatIconModule, TapDirective],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent implements OnInit {
  @Input() fractal!: Fractal;
  controlMenu = ControlMenu;
  itemMenu = Object.values(ControlMenu);
  collectionMenu = Object.values(CollectionControlMenu);

  ngOnInit(): void {
    this.toggleFrom(this.fractal.isItem);
  }

  onMenuItemHeld(menuItem: string): void {
    if (!this.fractal.isItem) return;
    if (menuItem === ControlMenu.Draft) {
      this.fractal.parent.childrenForms.disable();
    }
    if (menuItem === ControlMenu.Edit) {
      this.fractal.parent.childrenForms.enable();
    }
  }

  onMnuItemTouched(menuItem: string): void {
    switch (menuItem) {
      case ControlMenu.New:
        break;
      case ControlMenu.Edit:
        this.toggleFrom(true);
        break;
      case ControlMenu.Draft:
        this.toggleFrom(false);
        break;
    }
  }

  private toggleFrom(value: boolean): void {
    const { form } = this.fractal;
    if (!value && form.enabled) form.disable();
    if (value && form.disabled) form.enable();
  }
}
