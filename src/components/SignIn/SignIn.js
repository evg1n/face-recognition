import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }


    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data === 'success') {
                this.props.onRouteChange('home');
            }
        })
    }
    render () {
    
        const { onRouteChange } =this.props;
    
        return(
            <article className="br3 ba shadow-5 center b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 center mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db center fw6 lh-copy f6"     htmlFor="email-address">Email</label>
                                <input 
                                onChange={this.onEmailChange} 
                                className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"></input>
                            </div>
                            <div className="mv3">
                                    <label className="db center fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    onChange={this.onPasswordChange}
                                    className="b pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    autoComplete="current-password"
                                    name="password"
                                    id="password"></input>
                            </div>
                        </fieldset>
                        <div className="center">
                            <input className="f6 link dim br3 ba mt4 bw1 ph3 pv2 mb2 dib bg-transparent b--black" type="submit" onClick={this.onSubmitSignIn} value="Sign in"></input>
                        </div>
                        <div className="lh-copy center mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link pointer dim black db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default SignIn;