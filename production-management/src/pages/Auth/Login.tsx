import {Component} from "react";
import LoginForm from "../../components/Auth/LoginForm";

class Login extends Component {

    render() {
        return (
            <div
                style={{
                    margin: '230px'
                }}
            >
                <LoginForm />
            </div>
        );
    }
}

export default Login;