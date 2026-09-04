import { prepareErrorString } from "../hooks/errors";

export const nothingIsFound = (query: string): string => {
    return prepareErrorString(`"${query}" not found`);
};

export const foundBy = (query: string): string => {
    return prepareErrorString(`Found by "${query}"`);
};

export const foundListBy = (query: string): string => {
    return prepareErrorString(`"${query}"`);
};