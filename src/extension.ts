import * as vscode from "vscode";

let watcher: vscode.FileSystemWatcher | undefined;

const onBranchChange = async () => {
  await vscode.commands.executeCommand("workbench.action.closeAllEditors");

  const shouldCollapse = vscode.workspace
    .getConfiguration("git-refresh-checkout")
    .get<boolean>("autoCollapseFolders");
  if (shouldCollapse) {
    await vscode.commands.executeCommand(
      "workbench.files.action.collapseExplorerFolders"
    );
  }
};

const startWatchGitHead = () => {
  // const projectRoots = vscode.workspace.workspaceFolders;
  // if (projectRoots) {
  //   const uri = `{${projectRoots
  //     .map((root) => root.uri.path)
  //     .join(",")}}/.git/HEAD`;
  //   watcher = vscode.workspace.createFileSystemWatcher(uri, false, true, true);
  //   watcher.onDidCreate(onBranchChange);
  // }
  const uri = "**/.git/HEAD";
  watcher = vscode.workspace.createFileSystemWatcher(uri, false, true, true);
  watcher.onDidCreate((e) => {
    console.log({ e });
    onBranchChange();
  });
};

export function activate() {
  startWatchGitHead();
}

export function deactivate() {
  watcher?.dispose();
}
