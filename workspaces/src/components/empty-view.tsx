import { ActionPanel, List } from "@raycast/api";
import App, {AppInterface} from "../entities/app";
import Filter from "../entities/filter";
import CreateAppAction from "./app/create/action";
import Workspace from "../entities/workspace";

function EmptyView(props: { workspaces: Workspace[]; filter?: Filter; searchText: string; onCreate: (app: AppInterface) => void }) {
    if (props.workspaces.length == 0) {
        return (
            <List.EmptyView
                icon="😕"
                title="No matching workspaces found"
                description={`Can't find a workspace matching ${props.searchText}.\nCreate it now!`}
                actions={
                    <ActionPanel>
                        <CreateAppAction defaultTitle={props.searchText} onCreate={props.onCreate} />
                    </ActionPanel>
                }
            />
        );
    }
    return null;
    // switch (props.filter) {
    //     case Filter.Open: {
    //         return (
    //             <List.EmptyView
    //                 icon="🎉"
    //                 title="All done"
    //                 description="All todos completed - way to go! Why not create some more?"
    //                 actions={
    //                     <ActionPanel>
    //                         <CreateTodoAction defaultTitle={props.searchText} onCreate={props.onCreate} />
    //                     </ActionPanel>
    //                 }
    //             />
    //         );
    //     }
    //     case Filter.Completed: {
    //         return (
    //             <List.EmptyView
    //                 icon="😢"
    //                 title="No todos completed"
    //                 description="Uh-oh, looks like you haven't completed any todos yet."
    //             />
    //         );
    //     }
    //     case Filter.All:
    //     default: {
    //         return (
    //             <List.EmptyView
    //                 icon="📝"
    //                 title="No todos found"
    //                 description="You don't have any todos yet. Why not add some?"
    //                 actions={
    //                     <ActionPanel>
    //                         <CreateTodoAction defaultTitle={props.searchText} onCreate={props.onCreate} />
    //                     </ActionPanel>
    //                 }
    //             />
    //         );
    //     }
    // }
}
export default EmptyView;
