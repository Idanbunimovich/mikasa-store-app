import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            remember:false
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    saveAuthTokenInSessions = (token) => {
        window.localStorage.setItem('token', token);
    }
    saveUserTokenInSessions = (email, password) => {
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('password', password);
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onChangeCheckbox = (event) => {
        this.setState({signInRemember: event.target.checked})
    }

    onSubmitSignIn = () => {
        if(this.state.signInRemember){
            this.saveUserTokenInSessions(this.state.email,this.state.password)
        }
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                remember : this.state.remember
            })
        })
            .then(response => response.json())
            .then(user => {

                if (user.id) {
                    fetch('http://localhost:3000/signin', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password,
                            remember:this.state.remember
                        })
                    })
                        .then(response => {
                            console.log(response)
                            return response.json()
                        })
                        .then(data => {
                            if (data && data.success === "true") {
                                this.saveAuthTokenInSessions(data.token)
                                this.props.loadUser(data.user)
                                this.props.loggingIn(data.userId);
                                this.props.onRouteChange('home');
                            }
                        })
                        .catch(err=>console.log("hey"))
                }
            })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <div className="mv3 flex">
                                <input type="checkbox" checked={this.state.remember}  onChange={this.onChangeCheckbox}
                                       className="b"
                                       name="rememberMe"
                                       id="rememberMe"
                                />
                                <label>Remember me</label>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;