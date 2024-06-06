export const isKeyof = <T extends {}>(obj: T, key: any): key is keyof T =>
  obj.hasOwnProperty(key);
