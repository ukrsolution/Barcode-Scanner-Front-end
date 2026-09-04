import axios from '../axios';
import fetchJsonp from 'fetch-jsonp';
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';
import { en, de, _btoa, p_UCKey, makeid } from '../../helpers/data';
import { getDomain } from '../../helpers/window';

// eslint-disable-next-line react-hooks/rules-of-hooks
const pluginData = usePluginParams()

let lastResult = "";

const checkClearResult = () => {
    lastResult = "";
}

const check = async (key: string) => {
    return en('{"s":1,"m":"","st":"","x":"2123-05-03 00:00:00","l":null,"d":{"un":"Demo","ds":["demo"]}}');
}

const sendError = (error: any, localMessage: string): void => {
   
}

export const ukrsolution = {
    check,
    checkClearResult,
    sendError
}