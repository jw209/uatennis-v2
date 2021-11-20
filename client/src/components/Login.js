import React from "react";

class Login extends React.Component {
    render() {
        return(
            <div>
                <h1>Login page</h1>
                <h1>New member?<a className="nav-link" href="/register"> Sign up</a></h1>
            </div>
            
        )
    }
}

export default Login;