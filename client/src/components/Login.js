import React from "react";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const accountData = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(accountData);
    };

    render() {
        const { errors } = this.state;

        return(
            <div>
                <h1>Login page</h1>
                <h1>New member?<a className="nav-link" href="/register"> Sign up</a></h1><br/><br/>
                <form noValidate onSubmit={this.onSubmit}>
                <h1>Register page</h1><br/>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" class="form-control" placeholder="" aria-label="email" aria-describedby="basic-addon1" id="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                    />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                    <input type="password" class="form-control" placeholder="" aria-label="password" aria-describedby="basic-addon1" id="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                    />
                </div>
                <input type="submit" class="btn btn-outline-light" value="Login"/>
                </form>
            </div>
            
        )
    }
}

export default Login;