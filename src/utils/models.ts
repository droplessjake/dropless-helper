export enum Environment {
  'development',
  'staging',
  'production',
}

export enum Platform {
  'android',
  'ios',
}

export enum DeviceType {
  'simulator',
  'physical',
}
export interface IAppleDevice {
  name: string;
  version: string;
  uuid: string;
  type: DeviceType;
}
