import React, {Component, FormEvent, RefObject} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme , Grid, Paper, Box, CssBaseline, TextField, Button } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {EmployeeState} from "../../object/Employee/employee-object";
import {EmployeeContext} from "../../store/Employee/employee-context";
// @ts-ignore
import logo from '../../images/BLOOMING.png';

const defaultTheme = createMuiTheme();

interface LoginFormProps extends RouteComponentProps {}

class LoginForm extends Component<LoginFormProps> {
    private idInputRef: RefObject<HTMLInputElement> = React.createRef();
    private passwordInputRef: RefObject<HTMLInputElement> = React.createRef();

    static contextType = EmployeeContext;
    context!: React.ContextType<typeof EmployeeContext>;

    state = {
        isLoading: false,
    };

    submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const { history } = this.props;
        const { login, isSuccess, employee } = this.context as EmployeeState;

        const enteredId = this.idInputRef.current!.value;
        const enteredPassword = this.passwordInputRef.current!.value;

        this.setState({ isLoading: true });

        try {
            await login(enteredId, enteredPassword);

            this.setState({ isLoading: false }, () => {
                console.log('isSuccess:', isSuccess);
                console.log('employee:', employee);

                if (isSuccess) {
                    history.push('/');
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" style={{ height: '65vh', marginTop: 15, width: '75%', marginLeft: '12%' }}>
                    <CssBaseline />
                    <Grid
                        component={Paper}
                        elevation={6}
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        style={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            style={{
                                margin: '8px',
                                marginTop: '140px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <img src={logo} height="30vh" alt="Logo" style={{marginBottom: '10px'}}/>
                            <Box component="form" onSubmit={this.submitHandler} style={{ marginTop: 3, width: '30vh' }}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    id="id"
                                    label="ID"
                                    name="id"
                                    autoComplete="id"
                                    autoFocus
                                    inputRef={this.idInputRef}
                                />
                                <br />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={this.passwordInputRef}
                                />
                                <br />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    style={{ marginTop: 3, marginBottom: 2 }}
                                >
                                    로그인
                                </Button>
                                {this.state.isLoading && <p>Loading</p>}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withRouter(LoginForm);