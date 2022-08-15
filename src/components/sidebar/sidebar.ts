import { ExtensionContext } from "vscode";;

export class Sidebar {
  private context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.registerCommands();
  }

  registerCommands = () => {
    return;
  };
}