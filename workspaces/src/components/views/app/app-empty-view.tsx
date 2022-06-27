import { ActionPanel, List } from "@raycast/api";
import {AppInterface} from "../../../entities/app";
import CreateAppAction from "../../actions/app/create";
import Logger from "../../../utils/logger";

function AppEmptyView(props: { apps: AppInterface[]; filter?: any; searchText: string; onCreate: (app: AppInterface) => void }) {
    if (props.apps.length == 0) {
        return (
            <List.EmptyView
                icon="😕"
                title={`No matching Application found`}
                description={`Can't find Application matching ${props.searchText}.\nCreate it now!`}
                actions={<ActionPanel><CreateAppAction defaultTitle={props.searchText} onCreate={props.onCreate} /></ActionPanel>}

            />
        );
    }
    return null;
}
export default AppEmptyView;
