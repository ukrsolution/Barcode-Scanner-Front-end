import { createSelector, createStructuredSelector } from "reselect";

export const getMobModalSelector = (state: any) => state.mobModal;

// is open
export const getIsOpen = createSelector(getMobModalSelector, (modal) => modal.isOpen || false);

// type
export const getType = createSelector(getMobModalSelector, (modal) => modal.type ?? "");

// title
export const getTitle = createSelector(getMobModalSelector, (modal) => modal.title ?? "");

// description
export const getDescription = createSelector(getMobModalSelector, (modal) => modal.description ?? "");

export const getMobModalSummary = createStructuredSelector({
    isOpen: getIsOpen,
    type: getType,
    title: getTitle,
    description: getDescription,
  });
  