import * as cp from 'child_process';
import { DeviceType, IAppleDevice } from './models';

export async function runShellScript(code: string) {
  return new Promise<string>((resolve, reject) => {
    cp.exec(code, (err, out) => {
      if (err) return reject(err);
      return resolve(out);
    });
  });
}

export function formatDevices(devicesString: string): IAppleDevice[] {
  const devices = devicesString.split('\n').filter((a) => a !== '' && !a.includes('Watch'));
  const connected = devices.filter((a) => !a.includes('Simulator'));
  const simulators = devices.filter((a) => a.includes('Simulator'));

  const formattedConnected: IAppleDevice[] = connected.map((a) => {
    return {
      name: a.split('(')[0].trimEnd(),
      version: a.split('(')[1].replace(')', ''),
      uuid: a.split('(')[2].replace(')', ''),
      type: DeviceType.physical,
    };
  });

  const formattedSimulators: IAppleDevice[] = simulators.map((a) => {
    return {
      name: a.split('Simulator')[0].trimEnd(),
      version: a.split('Simulator')[1].split(')')[0].replace('(', ''),
      uuid: a.split('Simulator')[1].split('(')[2].replace(')', ''),
      type: DeviceType.simulator,
    };
  });

  return formattedConnected.concat(formattedSimulators);
}
