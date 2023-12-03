import React, {useContext, useState} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./login.module.scss";

import LoadingButton from '@mui/lab/LoadingButton';
import { Email, Key, LockPerson, Login } from '@mui/icons-material';
import {Alert, Box, Card, InputAdornment, Snackbar, TextField} from '@mui/material';
import {Validate, validateLoginProps} from "utils/validate";
import {useUserData} from "../../services/useUserData";
import {useDispatch} from "react-redux";
import {JWTParser} from "../../utils/parseJWT";
import {request} from "../../lib/axios";
import {setUser} from "../../slice/userSlice";
import {setWorkspace} from "slice/workspaceSlice";
import {setPage} from "slice/pageSlice";
import { AxiosError } from "axios";
import {Link} from "react-router-dom";
import {setToken} from "../../utils/cookie";

const LogIn = () => {
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { mutate } = useUserData.useLoginUserData();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState<Partial<validateLoginProps>>({});

  const handleSubmit = () => {
    setFormErrors(Validate.validateLogin({ email, password }));
    if(Object.keys(formErrors).length === 0) {
      setLoading(true)
      mutate({email, password}, {
        onSuccess: async (data) => {
          setLoading(false)
          if (data && data.accessToken) {
            setToken(data.accessToken)
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
      })
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
                <Key sx={{ color: 'rgb(34, 197, 94)' }}></Key>
              </span>
                  Welcome to SNote
            </Box>

            <p className="py-4">Please enter your email and password</p>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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

              <div className="tw-flex tw-items-center">
                <p className="tw-py-2 tw-text-sm tw-mb-2">
                    Forgot password? <span className="tw-text-primary">Get it back</span>
                </p>

                <Link to="/register" className="tw-py-2 tw-ml-auto tw-mb-2 tw-text-primary tw-cursor-pointer">Register</Link>
              </div>

              <LoadingButton
                variant="contained"
                sx={{ width: '100%' }}
                onClick={handleSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<Login />}
              >
                Login
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

export default LogIn;
