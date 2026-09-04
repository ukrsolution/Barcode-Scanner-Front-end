import { makeStyles } from "@material-ui/core/styles";
import * as mobileScreen from "../../../../helpers/mobileScreen";

export const InventoryContainerStyle = makeStyles(() => {
    return {
        freeActionsMessage: {
            fontSize: "16px",
            padding: "25px 0",
            textAlign: "center",
            "& a": {
                color: "#2067F0",
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline"
                }
            }
        },
        panelButton: {
            width: 80,
            height: 32,
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "17px",
            color: "#fff",
            backgroundColor: "#2067F0",
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                width: 128,
                height: 42,
                fontSize: "14px",
                lineHeight: "18px",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                width: 148,
                height: 48,
                fontSize: "15px",
                lineHeight: "18px",
            },
            "&:hover": {
                backgroundColor: "#0D4CC9"
            }
        },
        panelButtonCancel: {
            backgroundColor: "#041A43",
            color: "white",
            width: 80,
            height: 32,
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "17px",
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                width: 128,
                height: 42,
                fontSize: "14px",
                lineHeight: "18px",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                width: 148,
                height: 48,
                fontSize: "15px",
                lineHeight: "18px",
            },
        },
        postManagementWrapper: {
            display: "flex",
            paddingBottom: 12,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                paddingBottom: 16,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                paddingBottom: 24,
            }
        },
        imageContainerWrapper: {
            marginRight: 24,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                marginRight: 20,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                marginRight: 24,
            }
        },
        imageContainer: {
            width: "120px",
            maxHeight: "120px",
            margin: "0 auto",
            borderRadius: 4,
            overflow: "hidden",
            textAlign: "center",
            "& > svg": {
                opacity: 0.4,
                fontSize: "27px",
                padding: 39.5,
                [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                    fontSize: "48px",
                    padding: 34.5,
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                    fontSize: "60px",
                    padding: 37.5,
                }
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                width: "164px",
                maxHeight: "164px",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                width: "186px",
                maxHeight: "186px",
            }
        },
        image: {
            transition: mobileScreen.animation.transition,
            maxWidth: "120px !important",
            maxHeight: "120px !important",
            width: "auto",
            height: "auto",
            marginBottom: 8,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                maxWidth: "164px !important",
                maxHeight: "164px !important",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                maxWidth: "186px !important",
                maxHeight: "186px !important",
            }
        },
        button: {
            fontSize: "13px",
            lineHeight: "14px",
            textAlign: "center",
            padding: "8px 0",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            color: "#828282",
            backgroundColor: "transparent",
            cursor: "pointer",
            minWidth: 120,
            textDecoration: "none",
            display: "inline-block"
        },
        postId: {
            fontSize: 15,
            lineHeight: "18px",
            textAlign: "center",
            padding: "0 6px",
            border: "1px solid #DADADA",
            borderRadius: "4px",
            color: "#333333",
            backgroundColor: "transparent",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: 16,
                lineHeight: "18.75px",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: 20,
                lineHeight: "24px",
            },
        },
        postTitle: {
            color: '#041A43',
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "900" as any,
            marginBottom: 20,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: 16,
                lineHeight: "24px",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: 20,
                lineHeight: "30px",
            },
        },
        postTitleField: {
            width: "100%",
            "& > div": {
                padding: "9px 12px"
            },
            "& > label": {
                fontSize: 12,
                lineHeight: "14px",
                [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                    fontSize: 14,
                    lineHeight: "16px"
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                    fontSize: 16,
                    lineHeight: "18px"
                },
            }
        },
        manageBlockedBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            background: "#fff",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 15,
            opacity: 0.7,
            transition: "0.3s",
            padding: "10px 0"
        },
    }
});