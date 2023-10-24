import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../../store/slices/loginSlice';
import { useAppDispatch } from '../../../store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../../type/user.type';
import Bglogin from '../../../assets/bg-login.jpg'

const defaultTheme = createTheme();

export default function SignInSide() {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit: SubmitHandler<any> = (values: User) => {
        dispatch(loginAsync({ values, navigate }));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundImage: `url(${Bglogin})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="text"
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                {...register('username', { required: true })}
                            />
                            {errors.email && <p className='text-red-500'>กรุณากรอกอีเมล !</p>}
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
                            {errors.password && <p className='text-red-500'>กรุณากรอกรหัสผ่าน !</p>}
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
                                        to='/register'
                                        variant="body2"
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Links>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}