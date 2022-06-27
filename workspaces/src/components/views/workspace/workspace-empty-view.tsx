import { ActionPanel, List } from "@raycast/api";
import {AppInterface} from "../../../entities/app";
import CreateWorkspaceAction from "../../actions/workspace/create";
import {WorkspaceInterface} from "../../../entities/workspace";


function WorkspaceEmptyView(props: { appList: AppInterface[], workspaces: WorkspaceInterface[]; filter?: any; searchText: string; onCreate: (workspace: WorkspaceInterface) => void }) {
    if (props.workspaces.length == 0) {
        return (
            <List.EmptyView
                icon="😕"
                title={`No matching Workspace found`}
                description={`Can't find Workspace matching ${props.searchText}.\nCreate it now!`}
                actions={<ActionPanel><CreateWorkspaceAction appList={props.appList} defaultTitle={props.searchText} onCreate={props.onCreate} /></ActionPanel>}

            />
        );
    }
    return null;
}
export default WorkspaceEmptyView;
