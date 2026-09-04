export const actionTypes = {
    ORDER_CHANGE_STATUS: "ORDER_CHANGE_STATUS",
    ORDER_UPDATE_LOADER_STATUS: "ORDER_UPDATE_LOADER_STATUS"
};

export const changeStatus = (orderId: number, status: string) => ({
    type: actionTypes.ORDER_CHANGE_STATUS,
    payload: { orderId, status }
});

export const updateLoaderStatus = (status: boolean, orderId = 0) => ({
    type: actionTypes.ORDER_UPDATE_LOADER_STATUS,
    payload: { status, orderId }
});