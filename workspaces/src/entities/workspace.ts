import {AppInterface} from "./app";
import {Icon} from "@raycast/api";

interface WorkspaceApplication {
    appId: string;
    options: WorkspaceApplicationOption;
}

interface WorkspaceApplicationOption {
    automaticLaunch: boolean;
}

interface WorkspaceInterface{
    id: string;
    name: string;
    path: string;
    apps: WorkspaceApplication[];
    icon?: Icon;
    iconFilename?: string;
}
// class Workspace {
//     public id: number;
//     public name = "";
//     public path = "";
//     public apps: App[] = [];
//
//
//     constructor(id: number, name: string, path: string, apps: App[]) {
//         this.id = id;
//         this.name = name;
//         this.path = path;
//         this.apps = apps;
//     }
//
//     public export() {
//         return {
//             "id": this.id,
//             "name": this.name,
//             "path": this.path,
//             "apps": this.apps.map((val, _) => val.id),
//         }
//     }
//
//     public toString() {
//         return JSON.stringify({
//             "id": this.id,
//             "name": this.name,
//             "path": this.path,
//             "apps": this.apps,
//             })
//     }
// }
//
// export default Workspace;
export type {WorkspaceInterface, WorkspaceApplication, WorkspaceApplicationOption};
