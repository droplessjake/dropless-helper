import * as vscode from 'vscode';
import { Container } from './container';

export function activate(context: vscode.ExtensionContext) {
	// Create instance of container
	Container.create(context);
}

export function deactivate() {
	// Nothing to do here
}
