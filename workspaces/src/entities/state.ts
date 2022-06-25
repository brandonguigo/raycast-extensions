import {AppInterface} from "./app";
import {WorkspaceInterface} from "./workspace";

interface State {
    apps: AppInterface[],
    workspaces: WorkspaceInterface[],
    searchText: string
}

export type {State}
