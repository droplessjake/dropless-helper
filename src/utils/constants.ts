import { Environment, Platform } from './models';

export const envPrefix = '.env';

export const environments: Environment[] = [Environment.development, Environment.staging, Environment.production];

export const targets: Platform[] = [Platform.android, Platform.ios];
