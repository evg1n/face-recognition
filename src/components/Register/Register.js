import React from 'react';

const Register = ({onRouteChange}) => {
    return(
        <article className="br3 pa3 ba shadow-5 center b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="center f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 center lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="name"></input>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 center lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"></input>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 center lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" autoComplete="current-password" name="password" id="password"></input>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="f6 center link dim br3 ba mt4 bw1 ph3 pv2 mb2 dib bg-transparent b--black" type="submit" onClick={()=> onRouteChange('home')} value="Register"></input>
                    </div>
                    <div className="lh-copy center mt3">
                        <p onClick={() => onRouteChange('signin')} className="f6 link pointer dim black db">Sign In</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register;