import { Action, Icon } from "@raycast/api";
import {WorkspaceInterface} from "../../../entities/workspace";
import CreateWorkspaceForm from "../../forms/workspace-form";
import {AppInterface} from "../../../entities/app";

function CreateWorkspaceAction(props: { appList: AppInterface[], defaultTitle?: string; onCreate: (workspace: WorkspaceInterface) => void }) {
    return (
        <Action.Push
            icon={Icon.Plus}
    title="Create Workspace"
    shortcut={{ modifiers: ["cmd"], key: "n" }}
    target={<CreateWorkspaceForm onCreate={props.onCreate} appList={props.appList}/>}
    />
);
}

export default CreateWorkspaceAction;
