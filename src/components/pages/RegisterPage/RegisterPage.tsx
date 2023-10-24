import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerAsync } from '../../../store/slices/registerSlice';
import { useAppDispatch } from '../../../store/store';
import { User } from '../../../type/user.type';
import { Alert } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<any> = (values: User) => {
        dispatch(registerAsync({ values, navigate }));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate sx={{ mt: 1 }}
                        className='w-full'
                    >
                        <Box className='w-full'>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                {...register('username', { required: true })}
                            />
                            {errors.username && <Alert severity="error">กรุณากรอกอีเมล !</Alert>}
                        </Box>
                        <Box className='w-full'>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <Alert severity="error">กรุณากรอกรหัสผ่าน !</Alert>}
                        </Box>
                        <Box className='w-full'>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="confirm password"
                                type="password"
                                id="Confirmpassword"
                                autoComplete="current-password"
                                {...register('confirmpassword', { required: true })}
                            />
                            {errors.confirmpassword && <Alert severity="error">กรุณากรอกรหัสผ่าน !</Alert>}
                        </Box>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Links
                                    component={Link}
                                    to='/login'
                                    variant="body2"
                                >
                                    {"back"}
                                </Links>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}