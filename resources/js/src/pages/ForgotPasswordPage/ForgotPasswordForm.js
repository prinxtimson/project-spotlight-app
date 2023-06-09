import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "../../components/Container";
import { connect } from "react-redux";
import { requestPasswordReset } from "../../actions/auth";
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({ alerts, requestPasswordReset }) => {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSuccess = () => {
        setEmail("");
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        requestPasswordReset(email, handleSuccess, handleError);
    };

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: 3,
                    width: "100%",
                    maxWidth: 456,
                    mx: "auto",
                }}
            >
                <Box
                    component="span"
                    sx={{
                        margin: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Avatar
                        variant="square"
                        alt="Tritek Live"
                        src="/images/logo.png"
                        sx={{ width: 128, height: 32 }}
                    >
                        Tritek Live
                    </Avatar>
                </Box>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Stack sx={{ width: "100%" }} spacing={2}>
                    {alerts.map(
                        (alert) =>
                            alert.alertType === "danger" && (
                                <Alert key={alert.id} severity="error">
                                    {alert.msg}
                                </Alert>
                            )
                    )}
                </Stack>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: "100%" }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            Remember Password?{" "}
                            <Link to="/admin" variant="body2">
                                Login
                            </Link>
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps, { requestPasswordReset })(
    ForgotPasswordForm
);
