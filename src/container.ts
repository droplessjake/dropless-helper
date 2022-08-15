import { ExtensionContext } from "vscode";
import { Build } from "./components/build/build";
import { Sidebar } from "./components/sidebar/sidebar";

export class Container {
  static #instance: Container;
  static get instance(): Container {
    return Container.#instance;
  }

  private readonly _context: ExtensionContext;
  get context() {
    return this._context;
  }

  private readonly _build: Build;
  get build() {
    return this._build;
  }

  private readonly _sidebar: Sidebar;
  get sidebar() {
    return this._sidebar;
  }

  static create(context: ExtensionContext) {
    if (Container.#instance != null) throw new Error('Container is already initialised');

    Container.#instance = new Container(context);
    return Container.#instance;
  }

  private constructor(context: ExtensionContext) {
    this._context = context;
    this._build = new Build(context);
    this._sidebar = new Sidebar(context);
  }
  
}