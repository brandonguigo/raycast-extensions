import {AppInterface} from "../../../entities/app";
import {Action, Icon} from "@raycast/api";
import {WorkspaceInterface} from "../../../entities/workspace";

function OpenWorkspaceAction(props: {workspace: WorkspaceInterface, index: number, onToggle: (workspace: WorkspaceInterface, index: number) => void}) {
    return (
        <Action
            icon={Icon.Window}
            title="Open Workspace"
            onAction={() => props.onToggle(props.workspace, props.index)}
        />
    );
}

export default OpenWorkspaceAction
