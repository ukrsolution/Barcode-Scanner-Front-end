export const actionTypes = {
    M_MODAL_UPDATE: "M_MODAL_UPDATE",
};

export interface mobModalModalProps {
    isOpen: boolean;
    type: string;
    title: string;
    description: string;
}

export const mobModalUpdate = (data: mobModalModalProps) => ({
    type: actionTypes.M_MODAL_UPDATE,
    payload: { data }
})