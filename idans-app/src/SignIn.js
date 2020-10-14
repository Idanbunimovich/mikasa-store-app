import React from 'react';
import Error from "./error";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        if(props.email !== '') {
            this.state = {
                signInEmail: props.email,
                signInPassword: window.localStorage.getItem('password'),
                signInRemember: false,
                isError:false,

            }
        }
        else{
            this.state = {
                signInEmail: '',
                signInPassword: '',
                signInRemember: false,
                isError:false
            }
        }
    }
    changeErrorState = ()=>{
        let tmp = !this.state.isError
        this.setState({isError:tmp})
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onChangeCheckbox = (event) => {
        this.setState({signInRemember: event.target.checked})
    }
    saveAuthTokenInSessions = (token) => {
        window.localStorage.setItem('token', token);
    }
    saveUserTokenInSessions = (email, password) => {
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('password', password);
    }
    deleteUserTokenInSessions = () => {
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('password');
    }

    onSubmitSignIn = () => {
        if(this.state.signInRemember){
            this.saveUserTokenInSessions(this.state.signInEmail,this.state.signInPassword)
        }
        if(this.state.signInRemember === false){
            this.deleteUserTokenInSessions()
        }
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.success === "true") {
                    this.saveAuthTokenInSessions(data.token)
                    this.props.loadUser(data.user)
                    this.props.loggingIn(data.userId);
                    this.props.onRouteChange('home');
                }
                else{
                    this.setState({isError:true})
                }
            })
            .catch(err=>console.log("hi"))
    }

    render() {
        const { onRouteChange } = this.props.onRouteChange;
        return (
            <div>
                {this.state.isError === true ? <div className='zone'>
                    <Error change={this.changeErrorState} isError={this.state.isError} errorMessage={"invalid credentials"}/>
                </div>:null}
              <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    value={this.state.signInEmail}
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
                                    value={this.state.signInPassword}
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <div className="mv3 flex">
                                    <input type="checkbox" checked={this.state.signInRemember}  onChange={this.onChangeCheckbox}
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
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
            </div>
        );
    }
}

export default Signin;