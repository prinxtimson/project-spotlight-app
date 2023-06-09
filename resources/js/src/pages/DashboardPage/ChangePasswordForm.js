import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { connect } from "react-redux";
import { changePassword } from "../../actions/auth";
import DrawerContainer from "./DrawerContainer";

const ChangePasswordForm = ({ alerts, loading, changePassword }) => {
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const [formData, setFormData] = React.useState({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const { password, new_password, new_password_confirmation } = formData;

    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword(formData);
    };

    return (
        <DrawerContainer>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "white",
                        padding: 3,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
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
                        <div style={{ marginBottom: 30 }}>
                            <span className="p-float-label">
                                <Password
                                    value={password}
                                    name="password"
                                    id="password"
                                    onChange={handleOnChange}
                                    toggleMask
                                    feedback={false}
                                />
                                <label htmlFor="password">Old Password</label>
                            </span>
                        </div>
                        <div style={{ marginBottom: 30 }}>
                            <span className="p-float-label">
                                <Password
                                    value={new_password}
                                    name="new_password"
                                    id="new_password"
                                    onChange={handleOnChange}
                                    footer={footer}
                                    toggleMask
                                    className={classNames({
                                        "p-invalid":
                                            formData.password &&
                                            !passwordValidation.test(
                                                formData.password
                                            ),
                                    })}
                                />
                                <label htmlFor="password">New Password</label>
                            </span>
                        </div>

                        <div style={{ marginBottom: 10 }}>
                            <span className="p-float-label">
                                <Password
                                    value={new_password_confirmation}
                                    name="new_password_confirmation"
                                    id="new_password_confirmation"
                                    onChange={handleOnChange}
                                    toggleMask
                                    className={classNames({
                                        "p-invalid":
                                            formData.new_password &&
                                            !formData.new_password.match(
                                                formData.new_password_confirmation
                                            ),
                                    })}
                                />
                                <label htmlFor="password">
                                    Confirm New Password
                                </label>
                            </span>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </DrawerContainer>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    alerts: state.alert,
});

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);
