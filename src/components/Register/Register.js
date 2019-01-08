import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
         this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
         this.setState({password: event.target.value});
    }

     onRegisterSubmit = () => {
         console.log('button works')
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
                console.log('log user', user);
            }
        })
    }
    render (){

        return(
            <article className="br3 pa3 ba shadow-5 center b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="center f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 center lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                onChange={this.onNameChange}
                                className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                                name="email-address"
                                id="name"></input>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 center lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                onChange={this.onEmailChange}
                                className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email"
                                name="email-address"
                                id="email-address"></input>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 center lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                className="b pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password"
                                autoComplete="current-password"
                                name="password"
                                id="password"></input>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                            onClick={this.onRegisterSubmit}
                            className="f6 center link dim br3 ba mt4 bw1 ph3 pv2 mb2 dib bg-transparent b--black" 
                            type="submit"
                            value="Register"></input>
                        </div>
                        <div className="lh-copy center mt3">
                            <p onClick={() => this.props.onRouteChange('signin')} className="f6 link pointer dim black db">Sign In</p>
                        </div>
                    </div>
                </main>
            </article>
    )
    }
}

export default Register;