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
  export interface Trigger {
    text: string;
    iconName: IconType.Name;
    routerLink?: RoutingType.RouterLink;
  }

  export interface Triggers {
    actions: Trigger[];
    pages: Trigger[];
    settings: Trigger[];
  }
}

export namespace LoginType {
  export interface Input {
    formControl: FormControl;
    label: string;
    type: InputType.Type;
  }
}

export namespace CommonType {
  export interface Controls {
    [key: string]: FormControl;
  }
}
