import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import MenuContainer from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AboutDialog from "../AboutDialog";
import ConnectionOptionsDialog from "../ConnectionOptionsDialog";
import DeviceSelectionDialog from "../DeviceSelectionDialog";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppState } from "../../state";

const useStyles = makeStyles({
    settingsButton: {
        margin: "1.8em 0 0",
    },
});

export default function SettingsMenu({ mobileButtonClass }) {
    const classes = useStyles();
    const { roomType } = useAppState();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
    const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false);

    const anchorRef = useRef(null);

    return (
        <>
            {isMobile ? (
                <Button
                    ref={anchorRef}
                    onClick={() => setMenuOpen(true)}
                    startIcon={<MoreIcon />}
                    className={mobileButtonClass}
                >
                    More
                </Button>
            ) : (
                <Button
                    ref={anchorRef}
                    onClick={() => setMenuOpen(true)}
                    startIcon={<SettingsIcon />}
                    className={classes.settingsButton}
                >
                    Settings
                </Button>
            )}
            <MenuContainer
                open={menuOpen}
                onClose={() => setMenuOpen((isOpen) => !isOpen)}
                anchorEl={anchorRef.current}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: isMobile ? "left" : "right",
                }}
                transformOrigin={{
                    vertical: 0,
                    horizontal: "center",
                }}
            >
                <MenuItem onClick={() => setAboutOpen(true)}>
                    <Typography variant="body1">About</Typography>
                </MenuItem>
                <MenuItem onClick={() => setDeviceSettingsOpen(true)}>
                    <Typography variant="body1">
                        Audio and Video Settings
                    </Typography>
                </MenuItem>
                {roomType !== "peer-to-peer" && roomType !== "go" && (
                    <MenuItem onClick={() => setConnectionSettingsOpen(true)}>
                        <Typography variant="body1">
                            Connection Settings
                        </Typography>
                    </MenuItem>
                )}
            </MenuContainer>
            <AboutDialog
                open={aboutOpen}
                onClose={() => {
                    setAboutOpen(false);
                    setMenuOpen(false);
                }}
            />
            <DeviceSelectionDialog
                open={deviceSettingsOpen}
                onClose={() => {
                    setDeviceSettingsOpen(false);
                    setMenuOpen(false);
                }}
            />
            <ConnectionOptionsDialog
                open={connectionSettingsOpen}
                onClose={() => {
                    setConnectionSettingsOpen(false);
                    setMenuOpen(false);
                }}
            />
        </>
    );
}
