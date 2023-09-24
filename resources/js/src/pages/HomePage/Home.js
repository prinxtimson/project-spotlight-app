import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ConfirmDialog } from "primereact/confirmdialog";
import Typography from "@mui/material/Typography";
import Container from "../../components/Container";
import LiveSupport from "./LiveSupport";
import CallbackDialog from "../../components/CallbackDialog";
import { leaveLivecall } from "../../actions/livecall";
import { connect } from "react-redux";

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const OPENINGDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const Home = ({ livecall, leaveLivecall }) => {
    const [step, setStep] = React.useState("welcome");
    const [open, setOpen] = React.useState(false);
    const [min, setMin] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // React.useEffect(() => {
    //     getWaitingListCount();
    //     getCallbacks();
    // }, []);

    React.useEffect(() => {
        if (livecall) {
            window.addEventListener("beforeunload", (e) => {
                e.preventDefault();
                e.returnValue = "Are you sure you want to close?";
            });
            window.addEventListener("unload", (e) => {
                e.preventDefault();
                leaveLivecall(livecall.id);
            });
        }
    }, [livecall]);

    return (
        <Container>
            <CallbackDialog
                open={open}
                setStep={setStep}
                handleClose={handleClose}
            />
            <ConfirmDialog />

            {OPENINGDAYS.includes(DAYS[new Date().getDay()]) &&
            new Date().getHours() >= 0 &&
            new Date().getHours() <= 24 ? (
                <LiveSupport
                    handleClickOpen={handleClickOpen}
                    step={step}
                    setStep={setStep}
                />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h6" variant="h4" mb={3}>
                            Hello
                        </Typography>
                        <Typography component="p" variant="h5" mb={1}>
                            Sorry we are unable to take calls today.
                        </Typography>
                        <Typography component="p" variant="h5" mb={1}>
                            We are live Monday - Friday, 9am - 4pm to take
                            calls.
                        </Typography>
                        <Typography component="p" variant="h5" mb={1}>
                            You can drop us your details and a member of our
                            team will give you a call back.
                        </Typography>
                        <Typography component="p" variant="h5" mb={1}>
                            You can also explore our FAQ below for some
                            assistance.
                        </Typography>
                        <Typography component="p" variant="h5" mb={1}>
                            Thank you
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 5,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            //onClick={handleClickOpen}
                            size="small"
                            //disabled={Boolean(livecall?.left_at)}
                        >
                            Request Call Back
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                            href="https://tritekconsulting.co.uk/faq"
                            target="_blank"
                            size="small"
                        >
                            FAQ
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    livecall: state.livecall.livecall,
});

export default connect(mapStateToProps, { leaveLivecall })(Home);
