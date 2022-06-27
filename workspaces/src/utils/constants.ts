import {environment} from "@raycast/api";

export const CONFIG_FILE = environment.assetsPath + "/config.json"
export const ICONS_PATH = environment.assetsPath + "/icons/"
export class WorkspaceAppSettings{
    public static AUTO = "Automatic Lunch"

    static getLabelFromName(name: string) {
        switch (name) {
            case "AUTO":
                return this.AUTO
            break;
        }
        return ""
    }
}
