import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CameraIcon from "@mui/icons-material/CameraAlt";
import Typography from "@mui/material/Typography";
import PhoneInput from "react-phone-input-2";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import { updateUser, deleteAccount } from "../../actions/auth";
import DrawerContainer from "./DrawerContainer";

const ProfileForm = ({ alerts, user, updateUser, loading, deleteAccount }) => {
    const [inputRef, setInputRef] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [data, setData] = React.useState({
        firstname: "",
        lastname: "",
        avatar: "",
        phone: "",
    });

    React.useEffect(() => {
        setData({
            firstname: user?.profile?.firstname || "",
            lastname: user?.profile?.lastname || "",
            avatar: user?.avatar || "",
            phone: user?.phone || "",
        });
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (file) {
            formData.append("avatar", file);
        }
        formData.append("_method", "put");

        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);

        updateUser(formData);
    };

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
        setData({
            ...data,
            avatar: URL.createObjectURL(e.target.files[0]),
        });
    };

    return (
        <DrawerContainer>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <input
                    id="avatar"
                    name="avatar"
                    hidden
                    onChange={(e) => handleFileSelect(e)}
                    type="file"
                    accept="image/*"
                    ref={(ref) => setInputRef(ref)}
                />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 2,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Profile
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
                        sx={{ mt: 2 }}
                    >
                        <Box
                            component="div"
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Badge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                badgeContent={
                                    <IconButton
                                        onClick={() => inputRef.click()}
                                    >
                                        <CameraIcon />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    alt={user?.name}
                                    src={data.avatar}
                                    sx={{ width: 100, height: 100, mb: 2 }}
                                >
                                    {`${data.firstname.charAt(
                                        0
                                    )}${data.lastname.charAt(0)}`}
                                </Avatar>
                            </Badge>
                        </Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="Firstname"
                            name="firstname"
                            autoFocus
                            value={data.firstname}
                            onChange={(e) =>
                                setData({ ...data, firstname: e.target.value })
                            }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Lastname"
                            name="lastname"
                            value={data.lastname}
                            onChange={(e) =>
                                setData({ ...data, lastname: e.target.value })
                            }
                        />
                        <PhoneInput
                            inputProps={{
                                required: true,
                            }}
                            inputStyle={{
                                width: "100%",
                                paddingTop: "14.5px",
                                paddingBottom: "14.5px",
                            }}
                            containerStyle={{
                                marginBottom: 5,
                                marginTop: 10,
                            }}
                            specialLabel="Phone *"
                            country={"gb"}
                            value={data.phone}
                            onChange={(val) => setData({ ...data, phone: val })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 1.5, mb: 1 }}
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="error"
                            sx={{ mt: 1.5, mb: 2 }}
                            onClick={deleteAccount}
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Box>
            </Container>
        </DrawerContainer>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.loading,
});

export default connect(mapStateToProps, { updateUser, deleteAccount })(
    ProfileForm
);
