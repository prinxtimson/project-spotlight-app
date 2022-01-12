import React, { createContext, useCallback } from "react";
import { SelectedParticipantProvider } from "./useSelectedParticipant";

import AttachVisibilityHandler from "./AttachVisibilityHandler";
import useHandleRoomDisconnection from "./useHandleRoomDisconnection";
import useHandleTrackPublicationFailed from "./useHandleTrackPublicationFailed";
import useLocalTracks from "./useLocalTracks";
import useRestartAudioTrackOnDeviceChange from "./useRestartAudioTrackOnDeviceChange";
import useRoom from "./useRoom";
import useScreenShareToggle from "./useScreenShareToggle";

export const VideoContext = createContext();

export const VideoProvider = ({ options, children, onError = () => {} }) => {
    const onErrorCallback = useCallback(
        (error) => {
            console.log(`ERROR: ${error.message}`, error);
            onError(error);
        },
        [onError]
    );

    const {
        localTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        isAcquiringLocalTracks,
        removeLocalAudioTrack,
        removeLocalVideoTrack,
        getAudioAndVideoTracks,
    } = useLocalTracks();
    const { room, isConnecting, connect } = useRoom(
        localTracks,
        onErrorCallback,
        options
    );

    const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(
        room,
        onError
    );

    // Register callback functions to be called on room disconnect.
    useHandleRoomDisconnection(
        room,
        onError,
        removeLocalAudioTrack,
        removeLocalVideoTrack,
        isSharingScreen,
        toggleScreenShare
    );
    useHandleTrackPublicationFailed(room, onError);
    useRestartAudioTrackOnDeviceChange(localTracks);

    const videoTrack = localTracks.find(
        (track) => !track.name.includes("screen") && track.kind === "video"
    );

    return (
        <VideoContext.Provider
            value={{
                room,
                localTracks,
                isConnecting,
                onError: onErrorCallback,
                getLocalVideoTrack,
                getLocalAudioTrack,
                connect,
                isAcquiringLocalTracks,
                removeLocalVideoTrack,
                isSharingScreen,
                toggleScreenShare,
                getAudioAndVideoTracks,
            }}
        >
            <SelectedParticipantProvider room={room}>
                {children}
            </SelectedParticipantProvider>
            <AttachVisibilityHandler />
        </VideoContext.Provider>
    );
};
