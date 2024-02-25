export namespace DrawerType {
  export type Trigger = 'Actions' | 'Pages' | 'Settings' | 'Idle';
}

export namespace InputType {
  export type Type = 'text' | 'email' | 'password';
}

export namespace IconType {
  export enum Name {
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete',
    Home = 'home',
    Group = 'group',
    Close = 'close',
    
  }
}