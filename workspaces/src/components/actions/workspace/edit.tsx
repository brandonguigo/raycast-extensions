import {AppInterface} from "../../../entities/app";
import {Action, Icon} from "@raycast/api";
import {WorkspaceInterface} from "../../../entities/workspace";

function EditWorkspaceAction(props: {workspace: WorkspaceInterface, onToggle: () => void}) {
    return (
        <Action
            icon={Icon.Pencil}
            title="Edit Workspace"
            onAction={props.onToggle}
    />
);
}

export default EditWorkspaceAction
