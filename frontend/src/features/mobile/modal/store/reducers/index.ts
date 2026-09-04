import { actionTypes, mobModalModalProps } from "../actions";

const initialState: mobModalModalProps = {
    isOpen: false,
    type: "",
    title: "",
    description: ""
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case actionTypes.M_MODAL_UPDATE: {
            const { data } = action.payload;

            return {
                ...state,
                ...data
            };
        }

        default:
            return {
                ...state,
            };
    }
}
