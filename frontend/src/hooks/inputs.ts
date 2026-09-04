interface BufferProps {
    characters: Array<string>;
    lastUpdate: number;
    lifetime: number;
    startInterval: any;
}

let buffer: BufferProps = {
    characters: [],
    lastUpdate: 0,
    lifetime: 500,
    startInterval: null
}

const documentKeyDown = ({ isComposing, keyCode }: any) => {
    if (isComposing) return;

    // check key code and add to buffer
    console.log(String.fromCharCode(keyCode))
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90)) {
        buffer.characters.push(String.fromCharCode(keyCode));
        buffer.lastUpdate = Date.now();

        clearInterval(buffer.startInterval);
        buffer.startInterval = setTimeout(() => {
            // current buffer string
            const string: string = buffer.characters.join("");
            console.log(`get: ${string}`)

            // reset buffer by lifetime
            if (Date.now() - buffer.lastUpdate > buffer.lifetime) buffer.characters = [];
        }, buffer.lifetime);
    }
}

const setDocumentInput = () => {
    // add keyboard listener
    document.addEventListener("keydown", documentKeyDown);
}

const unsetDocumentInput = () => {
    // remove event listener
    document.removeEventListener("keydown", documentKeyDown);

    // reset buffer
    buffer.characters = [];
    buffer.lastUpdate = 0;
    clearInterval(buffer.startInterval);
}

export default {
    setDocumentInput,
    unsetDocumentInput
}