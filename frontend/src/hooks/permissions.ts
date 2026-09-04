import usePluginParams from "./usePluginParams";

export interface permissionsProps {
    [key: string]: string;
}

export interface mobilePermissionsProps {
    [key: string]: boolean;
}

export const list: permissionsProps = {
    AUTO_FOCUS: "AUTO_FOCUS"
};

export const mobilePermissions: mobilePermissionsProps = {
    [list.AUTO_FOCUS]: false
};

export const check = (permission: string): boolean => {
    const data = usePluginParams();

    if (["android", "ios"].includes(data.platform)) {
        return mobilePermissions[permission] ?? false;
    }

    return true;
};
