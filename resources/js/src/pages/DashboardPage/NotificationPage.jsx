import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { markNotification } from "../../features/notification/notificationSlice";
import DrawerContainer from "./DrawerContainer";

const NotificationPage = () => {
    const { notifications } = useSelector((state) => state.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        let _timeout = setTimeout(() => {
            dispatch(markNotification());

            clearTimeout(_timeout);
        }, 3000);
    }, []);

    return (
        <DrawerContainer>
            <div className="tw-grow tw-p-4 tw-flex tw-flex-col tw-items-center">
                <div className="tw-mt-4 tw-w-full">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div
                                className={`tw-border tw-p-2 tw-mb-1 tw-grid tw-grid-cols-5 tw-items-center ${
                                    item.read_at ? "" : "tw-bg-sky-100"
                                }`}
                                key={item.id}
                            >
                                <div className="tw-text-lg tw-font-semibold ">
                                    {item.type.split("\\")[2]}
                                </div>

                                <div className="tw-text-lg tw-col-span-3">
                                    {item.type ==
                                    "App\\Notifications\\ReportExported"
                                        ? "Report had been sent"
                                        : ""}
                                </div>

                                <small>
                                    {moment(item.created_at).fromNow()}
                                </small>
                            </div>
                        ))
                    ) : (
                        <div className="tw-border tw-p-2 tw-mb-1 tw-grid tw-grid-cols-5 tw-items-center">
                            <div className="tw-text-lg tw-font-semibold "></div>

                            <div className="tw-text-lg tw-col-span-3">
                                You have no notification yet ...
                            </div>

                            <small></small>
                        </div>
                    )}
                </div>
            </div>
        </DrawerContainer>
    );
};

export default NotificationPage;
