import { actionTypes } from "../actions";

const initialState = {
    loaderStatus: false,
    loaderOrderId: 0
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case actionTypes.ORDER_UPDATE_LOADER_STATUS: {
            const { status, orderId } = action.payload;

            return {
                ...state,
                loaderStatus: status,
                loaderOrderId: orderId,
            };
        }

        default:
            return {
                ...state,
            };
    }
}
