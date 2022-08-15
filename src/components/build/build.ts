import { commands, window, ExtensionContext } from "vscode";
import { environments } from "../../utils/constants";
import { Environment, Target } from "../../utils/models";

export class Build {
  private context: ExtensionContext;
  
  private environment?: Environment;

  private target?: Target;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.registerCommands();
  }

  registerCommands = () => {
    this.context.subscriptions.push(commands.registerCommand('dropless-helper.buildApp', this.selectEnvironment));
  };

  selectEnvironment = async () => {
    const answer = await window.showQuickPick(environments.map((a) => Environment[a]), { title: 'Which environment?'});
    
    if (answer) this.environment = environments.find((a) => Environment[a] === answer);
    else this.environment = undefined;
  };
}