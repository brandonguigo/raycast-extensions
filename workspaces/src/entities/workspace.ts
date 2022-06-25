import {App} from "./app";

export interface Workspace {
    id: string,
    name: string,
    path: string,
    app: App
}
