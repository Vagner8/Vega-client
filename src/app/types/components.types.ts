import { FormControl } from '@angular/forms';

export namespace RoutingType {
  export enum RouterLink {
    Home = '/',
    Users = '/users',
  }
}

export namespace InputType {
  export type Type = 'text' | 'email' | 'password';
}

export namespace IconType {
  export type Name = 'add' | 'edit' | 'delete' | 'home' | 'group' | 'close';
}

export namespace TriggersType {
  export interface Button {
    text: string;
    iconName: IconType.Name;
    routerLink?: RoutingType.RouterLink;
  }

  export interface Buttons {
    actions: Button[];
    pages: Button[];
    settings: Button[];
  }
}

export namespace LoginType {
  export interface Input {
    label: string;
    type: InputType.Type;
    formControl: FormControl;
  }
}

export namespace CommonType {
  export interface Controls {
    [key: string]: FormControl;
  }
}
