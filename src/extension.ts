import * as vscode from "vscode";

let watcher: vscode.FileSystemWatcher | undefined;

const startWatchGitHead = () => {
  const projectRoots = vscode.workspace.workspaceFolders;
  if (projectRoots) {
    const uri = `{${projectRoots
      .map((root) => root.uri.path)
      .join(",")}}/.git/HEAD`;
    watcher = vscode.workspace.createFileSystemWatcher(uri, false, true, true);
    watcher.onDidCreate(async (e) => {
      console.log({ e });
      await Promise.all(
        vscode.window.tabGroups.all.map((group) =>
          vscode.window.tabGroups.close(group)
        )
      );
    });
  }
};

export function activate() {
  startWatchGitHead();
}

export function deactivate() {
  watcher?.dispose();
}
