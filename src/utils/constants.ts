import { Environment, Target } from "./models";

export const envPrefix = '.env';

export const environments: Environment[] = [Environment.development, Environment.staging, Environment.production];

export const targets: Target[] = [Target.android, Target.ios];