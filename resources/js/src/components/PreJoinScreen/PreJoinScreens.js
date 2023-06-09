import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import DeviceSelectionScreen from "./DeviceSelectionScreen";
import RoomNameScreen from "./RoomNameScreen";
import IntroContainer from "../IntroContainer";
import MediaErrorSnackbar from "./MediaErrorSnackbar";
import useVideoContext from "../../hooks/useVideoContext";
import { connect } from "react-redux";

export const Steps = {
    roomNameStep: 1,
    deviceSelectionStep: 2,
};

const PreJoinScreens = ({ user, URLRoomID, password, loading }) => {
    const { getAudioAndVideoTracks, room } = useVideoContext();

    const [roomId, setRoomId] = useState("");
    const [step, setStep] = useState(Steps.roomNameStep);

    const [name, setName] = useState("");

    const [mediaError, setMediaError] = useState();

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setStep(Steps.deviceSelectionStep);
        }
        if (URLRoomID) {
            setRoomId(URLRoomID);
        }
        if (name) {
            setStep(Steps.deviceSelectionStep);
        }
        return () => {
            setStep(1);
            setRoomId("");
            setName("");
        };
    }, [user, URLRoomID, room]);

    useEffect(() => {
        if (step === Steps.deviceSelectionStep && !mediaError) {
            getAudioAndVideoTracks().catch((error) => {
                console.log("Error acquiring local media:");
                console.dir(error);
                setMediaError(error);
            });
        }
    }, [getAudioAndVideoTracks, step, mediaError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(Steps.deviceSelectionStep);
    };

    return (
        <IntroContainer>
            <MediaErrorSnackbar error={mediaError} />
            {loading ? (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    style={{ height: "100%" }}
                >
                    <div>
                        <CircularProgress variant="indeterminate" />
                    </div>
                </Grid>
            ) : (
                <>
                    {step === Steps.roomNameStep && (
                        <RoomNameScreen
                            name={name}
                            setName={setName}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    {step === Steps.deviceSelectionStep && (
                        <DeviceSelectionScreen
                            name={name}
                            roomId={roomId}
                            password={password}
                            setStep={setStep}
                        />
                    )}
                </>
            )}
        </IntroContainer>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading,
});

export default connect(mapStateToProps)(PreJoinScreens);
