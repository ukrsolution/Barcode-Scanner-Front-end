
import { SagaIterator } from "redux-saga";
import { put, select, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as postsActions from "../../posts/actions";
import { Selectors as postsSelectors } from "../../posts/selectors";
// import * as searchSelectors from "../../search/selectors";
import * as actions from "../actions";

function* changeValue({ payload: { } }: ActionType<typeof actions.actions.changeValue>): SagaIterator {
    try {
        const activePost: any = yield select(postsSelectors.getPostToManagement);
        // const lastQuery: string = yield select(searchSelectors.getLastQuery);

        if (activePost && activePost.ID) {
            // make search again by post id
            yield put(postsActions.actions.managementInventoryFromPreview({ postId: activePost.ID }));
        }
    } catch (e: any) {
        console.error(`CSF_CHANGE_VALUE. ${e.message}`);
    }
}

export default [
    takeEvery(actions.actions.changeValue, changeValue),
];
