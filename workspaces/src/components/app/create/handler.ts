import {useCallback} from "react";
import { nanoid } from "nanoid";

class CreateAppHandler {
    static handleCreate(state: any, setState: any) {
        useCallback(
            (name: string, command: string) => {
                const newApps = [...state.apps, { id: nanoid(), name, command}];
                setState((previous: any) => ({ ...previous, apps: newApps,}));
            },
            [state.apps, setState]
        );
    }
}
