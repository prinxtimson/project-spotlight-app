import React from "react";

import AudioInputList from "./AudioInputList";
import AudioOutputList from "./AudioOutputList";
import {
    DialogContent,
    Typography,
    Divider,
    Dialog,
    DialogActions,
    Button,
    DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VideoInputList from "./VideoInputList";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "600px",
        minHeight: "400px",
        [theme.breakpoints.down("xs")]: {
            width: "calc(100vw - 32px)",
        },
        "& .inputSelect": {
            width: "calc(100% - 35px)",
        },
    },
    button: {
        float: "right",
    },
    paper: {
        [theme.breakpoints.down("xs")]: {
            margin: "16px",
        },
    },
    headline: {
        marginBottom: "1.3em",
        fontSize: "1.1rem",
    },
    listSection: {
        margin: "2em 0 0.8em",
        "&:first-child": {
            margin: "1em 0 2em 0",
        },
    },
}));

export default function DeviceSelectionDialog({ open, onClose }) {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paper: classes.paper }}
        >
            <DialogTitle>Audio and Video Settings</DialogTitle>
            <Divider />
            <DialogContent className={classes.container}>
                <div className={classes.listSection}>
                    <Typography variant="h6" className={classes.headline}>
                        Video
                    </Typography>
                    <VideoInputList />
                </div>
                <Divider />
                <div className={classes.listSection}>
                    <Typography variant="h6" className={classes.headline}>
                        Audio
                    </Typography>
                    <AudioInputList />
                </div>
                <div className={classes.listSection}>
                    <AudioOutputList />
                </div>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={onClose}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
