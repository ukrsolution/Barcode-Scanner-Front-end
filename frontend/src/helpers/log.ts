import * as logActions from "../store/log/actions";
import Store from "../store";

export const error = (event: any, name: string): void => {
    Store.store.dispatch(logActions.actions.logError({ message: `${name}. ${event.message}`, error: event }));
}