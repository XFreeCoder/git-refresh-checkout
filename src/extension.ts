import * as vscode from "vscode";

let watcher: vscode.FileSystemWatcher | undefined;

const onBranchChange = async () => {
  await vscode.commands.executeCommand(
    "workbench.files.action.collapseExplorerFolders"
  );
  await vscode.commands.executeCommand("workbench.action.closeAllEditors");
};

const startWatchGitHead = () => {
  const projectRoots = vscode.workspace.workspaceFolders;
  if (projectRoots) {
    const uri = `{${projectRoots
      .map((root) => root.uri.path)
      .join(",")}}/.git/HEAD`;
    watcher = vscode.workspace.createFileSystemWatcher(uri, false, true, true);
    watcher.onDidCreate(onBranchChange);
  }
};

export function activate() {
  startWatchGitHead();
}

export function deactivate() {
  watcher?.dispose();
}
