import {Component} from "react";
import LoginForm from "../../components/Auth/LoginForm";

class Login extends Component {

    render() {
        return (
            <div
                style={{
                    marginTop: '110px'
                }}
            >
                <LoginForm />
            </div>
        );
    }
}

export default Login;