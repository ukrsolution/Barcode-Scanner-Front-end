import { SagaIterator } from "redux-saga";
import { put, select, takeEvery } from "redux-saga/effects";
import * as searchActions from "../actions";
import * as settingsActions from "../../settings/actions";
import * as postsActions from "../../posts/actions";
import * as logActions from "../../log/actions";
import * as mobileCommandsActions from "../../mobile/commands/actions";
import { getOrdersFilterParams, getProductsFilterParams, getProductsWpmlParams } from "../../settings/selectors";
import { FilterProps } from "../models";
import { MobileCommandProps } from "../../../features/mobile/scanning/containers/ScanningContainer";
import { getFilterWpmlOptions } from "../../../helpers/data";
import { Selectors as postsSelectors } from "../../posts/selectors";
import { Selectors as searchSelectors } from "../../search/selectors";

export function* getSearchFilter(): SagaIterator {
    const wpmlParams = yield select(getProductsWpmlParams);
    const products = yield select(getProductsFilterParams)
    const orders = yield select(getOrdersFilterParams)

    const filter: FilterProps = {
        products: {
            ID: products.ID ?? true,
            post_title: products.post_title ?? true,
            _sku: products._sku ?? true,
            customStatus: products.customStatus ?? true,
            custom: products.custom ?? "",
            // custom fields
            _variation_description: products._variation_description ?? true,
            // external plugins
            _alg_ean: products._alg_ean ?? true,
            _wpm_gtin_code: products._wpm_gtin_code ?? true,
            hwp_product_gtin: products.hwp_product_gtin ?? true,
            _wepos_barcode: products._wepos_barcode ?? true,
            _ts_gtin: products._ts_gtin ?? true,
            _ts_mpn: products._ts_mpn ?? true,
            usbs_barcode_field: products.usbs_barcode_field ?? true,
        },
        orders: {
            ID: orders.ID ?? true,
            customStatus: orders.customStatus ?? true,
            custom: orders.custom ?? "",
            wt_seq_ordnum: orders.wt_seq_ordnum ?? true,
        },
        wpml: getFilterWpmlOptions(wpmlParams)
    };

    return filter;
}

function* searchModalOpenStatus({ payload: { status } }: any): SagaIterator {
    if (status) {
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        yield put(searchActions.actions.autoFocus({ status: true, focusOn: "search" }));
        yield put(postsActions.actions.updatePostsList({ list: [] }));
    }
}

function* searchFinished(): SagaIterator {
    try {
        const postToManagement = yield select(postsSelectors.getPostToManagement);
        const searchData = yield select(searchSelectors.getSearchSelector);
        const postsList = yield select(postsSelectors.getPostsList);
        const rootEl: HTMLElement | null = document.querySelector("#ukrsolution-barcode-scanner-mobile");

        const data: MobileCommandProps = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_SCANNING_START,
            options: {
                status: true,
                postManage: rootEl && rootEl.offsetHeight && ((postToManagement && postToManagement.ID) || Object.keys(searchData.message).length || postsList.length),
                documentHeight: rootEl ? rootEl.offsetHeight : 0
            },
        };
        window.parent.postMessage(data, "*");
    } catch (error: any) {
        yield put(logActions.actions.logError({ message: `searchFinished. ${error.message}`, error }));
    }
}

function* cancelRequests(): SagaIterator {
    try {
        // @ts-ignore
        window.requests.forEach((request: any) => {
            console.warn(request)
            request.cancel();
        });

        // clear prev search
        yield put(postsActions.actions.updatePostManagement({ post: {} }));
        yield put(postsActions.actions.updatePreviousPostsList({ list: [] }));
        yield put(postsActions.actions.updatePostsList({ list: [] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
        yield put(searchActions.actions.autofill({ query: " " }));
        yield put(searchActions.actions.resetAllMessages());
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        yield put(searchActions.actions.updateLoaderAutofillStatus({ status: false }));

        yield put(searchActions.actions.finished());
    } catch (error: any) {
        yield put(logActions.actions.logError({ message: `cancelRequests. ${error.message}`, error }));
    }
}

function* appModalClose(): SagaIterator {
    try {
        yield put(searchActions.actions.openMobileFilter({ status: false }));
    } catch (error: any) {
        yield put(logActions.actions.logError({ message: `appModalClose. ${error.message}`, error }));
    }
}

export default [
    takeEvery(settingsActions.actionTypes.SEARCH_MODAL_OPEN_STATUS, searchModalOpenStatus),
    takeEvery(settingsActions.actionTypes.APP_MODAL_CLOSE, appModalClose),
    takeEvery(searchActions.actions.finished, searchFinished),
    takeEvery(searchActions.actions.cancelRequests, cancelRequests)
];
