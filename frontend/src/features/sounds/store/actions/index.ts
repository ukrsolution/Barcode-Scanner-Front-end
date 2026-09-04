export const tones = {
    fail: "bs-sound-fail",
    increase: "bs-sound-increase",
    decrease: "bs-sound-decrease",
}

import { createAction } from 'typesafe-actions';

export const actions = {
    soundPlay: createAction('SOUND/PLAY')<{ tone: string }>(),
    setSoundStatus: createAction('SOUND/STATUS')<{ status: boolean }>(),
}