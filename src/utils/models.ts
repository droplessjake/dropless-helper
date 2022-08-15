export enum Environment {
  'development',
  'staging',
  'production'
}

export enum Target {
  'android',
  'ios',
}

export interface IAppleDevice {
  name: string;
  version: string;
  uuid: string;
}
