import { commands, window, ExtensionContext } from 'vscode';
import { environments, targets } from '../../utils/constants';
import { formatDevices, runShellScript } from '../../utils/helpers';
import { Environment, IAppleDevice, Platform } from '../../utils/models';

export class Build {
  private context: ExtensionContext;

  private environment?: Environment;

  private platform?: Platform;

  private device?: IAppleDevice;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.registerCommands();
  }

  registerCommands = () => {
    this.context.subscriptions.push(commands.registerCommand('dropless-helper.buildApp', this.startBuild));
  };

  startBuild = async () => {
    this.environment = await this.selectEnvironment();
    this.platform = await this.selectPlatform();
    this.device = await this.selectDevice();
  };

  selectEnvironment = async (): Promise<Environment | undefined> => {
    const res = await window.showQuickPick(
      environments.map((a) => Environment[a]),
      { title: 'Which environment?' },
    );
    return res ? environments.find((a) => Environment[a] === res) : undefined;
  };

  selectPlatform = async (): Promise<Platform | undefined> => {
    const res = await window.showQuickPick(
      targets.map((a) => Platform[a]),
      { title: 'Which platform?' },
    );
    return res ? targets.find((a) => Platform[a] === res) : undefined;
  };

  selectDevice = async (): Promise<IAppleDevice | undefined> => {
    if (this.platform === Platform.ios) {
      const devices = formatDevices(await runShellScript(`xcrun xctrace list devices | grep -oE '.*iPhone.*'`));
      const res = await window.showQuickPick(
        devices.map((a) => `${a.name} - ${a.version}`),
        { title: 'Which device?' },
      );
      return devices.find((a) => a.name === res?.split(' -')[0]);
    }
  };
}
