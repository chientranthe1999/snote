import React, {useContext, useState} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./register.module.scss";
import {Alert, Box, Card, InputAdornment, Snackbar, TextField} from "@mui/material";
import {Add, DriveFileRenameOutline, Email, LockPerson, PersonAddAlt} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useUserData} from "../../services/useUserData";
import {useDispatch} from "react-redux";
import {Validate, validateRegistrationProps} from "../../utils/validate";
import {JWTParser} from "../../utils/parseJWT";
import {request} from "../../lib/axios";
import {setUser} from "../../slice/userSlice";
import {setWorkspace} from "../../slice/workspaceSlice";
import {setPage} from "../../slice/pageSlice";
import {AxiosError} from "axios";
import {Link} from "react-router-dom";
import {GenerateProfilePicture} from "../../utils/generateProfilePicture";
import {useThemeDetector} from "../../hooks/useThemeDetector";

const Register = () => {
  const isDarkMode = useThemeDetector();
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { mutate } = useUserData.useRegisterUserData();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState<Partial<validateRegistrationProps>>({});
  const handleSubmit = () => {
    setFormErrors(Validate.validateRegistration({ name, email, password }));
    if(Object.keys(formErrors).length === 0) {
      setLoading(true)
      const color = GenerateProfilePicture.getRandomColor();
      const url = GenerateProfilePicture.createImageFromInitials(
        50,
        name,
        color
      )!;

      const userData = {
        name,
        email,
        password,
        isDarkMode,
        profilePicture: {
          url,
        },
      };

      mutate(userData, {
        onSuccess: async (data) => {
          setLoading(false)
          if (data && data.accessToken) {
            const { userId } = JWTParser.parseJWT(data.accessToken);
            const user = await request({ url: `/users/${userId}` });

            const { workspaceId } = user.data.workspaces?.[0] || {};
            const workspace = await request({
              url: `/workspaces/${workspaceId}`,
            });

            const pageId = workspace.data.pages[0].id;
            const page = await request({
              url: `/pages/${pageId}`,
            });

            dispatch(setUser({ ...user.data }));
            dispatch(setWorkspace({ ...workspace.data }));
            dispatch(setPage({ ...page.data }));

            setName("");
            setEmail("");
            setPassword("");
          }
        },
        onError: (error: AxiosError) => {
          const data = error.response?.data as {
            error: string;
          };

          setLoading(false)
          setOpen(true)
          setErrorMessage(data.error)
        },
      });
    }
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className="h-[72vh]">
        <Card
          sx={{
            width: '500px',
            margin: '0 auto',
            marginTop: '120px',
            padding: '24px',
            color: 'inherit',
          }}
          className="card"
        >
          <Box component="h2" sx={{ fontSize: '24px', fontWeight: '500' }}>
              <span className="tw-mr-2">
                <PersonAddAlt sx={{ color: 'rgb(34, 197, 94)' }}></PersonAddAlt>
              </span>
            Create new account to join SNote
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              label="Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutline />
                  </InputAdornment>
                ),
              }}
              value={name}
              onChange={e => setName( e.target.value)}
              sx={{ width: '100%', marginBottom: '16px' }}
              variant="standard"
              autoComplete="name"
              placeholder="Enter your full name..."
              error={!!formErrors.name}
              helperText={formErrors.name}
            />

            <TextField
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              value={email}
              onChange={e => setEmail( e.target.value)}
              sx={{ width: '100%', marginBottom: '16px' }}
              variant="standard"
              autoComplete="email"
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <TextField
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockPerson />
                  </InputAdornment>
                ),
              }}
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              sx={{ width: '100%' }}
              variant="standard"
              autoComplete="current-password"
              error={!!formErrors.password}
              helperText={formErrors.password}
            />

            <p className="tw-py-2 tw-text-sm tw-mb-2">
              Have an account <Link to="/login" className="tw-text-primary">go to Login</Link>
            </p>

            <LoadingButton
              variant="contained"
              sx={{ width: '100%' }}
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="start"
              startIcon={<Add />}
            >
              Register
            </LoadingButton>
          </Box>
        </Card>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
