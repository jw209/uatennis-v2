import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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

        this.props.loginUser(accountData);
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
                        className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                        })}
                    />
                    <span className="red-text">{errors.email}{errors.emailnotfound}</span>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                    <input type="password" class="form-control" placeholder="" aria-label="password" aria-describedby="basic-addon1" id="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        className={classnames("", {
                            invalid: errors.password || errors.incorrectpassword
                        })}
                    />
                    <span className="red-text">{errors.password}{errors.incorrectpassword}</span>
                </div>
                <input type="submit" class="btn btn-outline-light" value="Login"/>
                </form>
            </div>
            
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
) (Login);