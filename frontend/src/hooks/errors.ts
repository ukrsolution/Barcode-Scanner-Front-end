export function prepareErrorString(string: string): string {
    try {
        const target = /href=/ig;
        const apos = /'/ig;
        const quot = /"/ig;

        return string
            .replaceAll(target, `target="_blank" href=`)
            .replaceAll(apos, `&apos;`)
            .replaceAll(quot, `&quot;`);
    } catch (error: any) {
        console.error(`prepareErrorString. ${error.message}`);
        return "";
    }
}

export function prepareErrors(errors: Array<any>): Array<string> {
    return errors.map((error: any) => {
        return prepareErrorString(error.notice);
    });
}