import {AppInterface} from "../../../entities/app";
import {Action, Icon} from "@raycast/api";
import {WorkspaceInterface} from "../../../entities/workspace";

function DeleteWorkspaceAction(props: {workspace: WorkspaceInterface, index: number, onToggle: (app: WorkspaceInterface, index: number) => void}) {
    return (
        <Action
            icon={Icon.Trash}
            title="Delete Workspace"
            onAction={() => props.onToggle(props.workspace, props.index)}
            shortcut={{ modifiers : ["cmd"], key:"delete"}}
        />
    );
}

export default DeleteWorkspaceAction
