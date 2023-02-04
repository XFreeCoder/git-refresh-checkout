import * as vscode from "vscode";

let watcher: vscode.FileSystemWatcher | undefined;

const closeAllTabs = async () => {
	return await Promise.all(
		vscode.window.tabGroups.all.map((group) =>
			vscode.window.tabGroups.close(group)
		)
	);	
}

const startWatchGitHead = () => {
  const projectRoots = vscode.workspace.workspaceFolders;
  if (projectRoots) {
    const uri = `{${projectRoots
      .map((root) => root.uri.path)
      .join(",")}}/.git/HEAD`;
    watcher = vscode.workspace.createFileSystemWatcher(uri, false, true, true);
    watcher.onDidCreate(closeAllTabs);
  }
};

export function activate() {
  startWatchGitHead();
}

export function deactivate() {
  watcher?.dispose();
}
