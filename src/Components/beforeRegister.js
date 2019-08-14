import React from 'react';
import {createUser,signIn,fire}  from '../firebase/firebaseManager';
import '../main-style.css';
const logo = require('./bee.png') ;




class BeforeRegister extends React.Component {
    _isMounted = false;
    constructor(){
        super();
        this.state = {
            pass: '',
            email: '',
            err_err:'',
            logged_in:true
        };
    }


    getEmail = (e) => {
        this.setState({
            email: e.target.value,
            err_err:''
        })
    };
    getPass = (e) => {
        this.setState({
            pass: e.target.value,
            err_err:''
        })
    };
    pressEnter = (e)=>{
        let  el = e || window.event;
        if (el.which === 13){
            this.login()
        }
    };


    login =()=>{

        const {pass, email}=this.state;
        if (!pass || !email ) {
            this.setState({
                err_err: this.state.name?'': 'Email and Pasword are required.',

            })
        }
        else{
            signIn(email,pass)
                .then(()=> {
                    this.props.history.push('/dashboard')
                })
                .catch((e)=>{
                this.setState({
                    err_err:e.message,
                    pass: '',
                    email: '',
                });
            })
        }
    };
    register = () => {

        const {pass, email}=this.state;
        if (!pass || !email ) {
            this.setState({
               err_err: this.state.name?'': 'Email and Pasword are required.',
            })
        }
        else{
            createUser(email,pass).then( ()=>{
                this.setState({
                    pass: '',
                    email: '',
                });
                this.props.history.push('/dashboard')
                  }).catch((e)=>{
                this.setState({
                    err_err:e.message
                })

                })

        }

    };

    componentDidMount(){

        this._isMounted = true;
        fire.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified ) {
                this.props.history.push('/dashboard')
            }
            else{
                if(this._isMounted){
                    this.setState({
                        logged_in:false
                    })
                }
            }
        })

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const {pass, email, err_err, logged_in } = this.state;
        return (
            <>
            {  !logged_in &&
            <div className="container">
                <div className="main">
                    <div className="form-style-5">
                        <fieldset>
                            <legend>Do you want to see Events of the world ? </legend>

                            {err_err?<span className="err">{err_err}</span>:null}
                            <input type="email" value={email} onChange={this.getEmail} placeholder="Your email*"  />
                            <input type="password" value={pass} onChange={this.getPass} placeholder="Your password *" onKeyPress={this.pressEnter}/>
                        </fieldset>
                        <input type="button" className="btn btn-info" onClick={this.login}   value={'Login'} />
                        <h6 className="regLine"> Not Registered Yet ? </h6>
                        <input type="button" className="btn btn-info" onClick={this.register}   value={'Register'} />
                    </div>
                    <div style={{marginTop:'12px'}}><span style={{color: '#E91E63',
                        fontWeight: '800', fontSize: '19px'}}>What I've used:</span><br/>
                        Front - React/Redux, axios, email Validation by sending Link<br/>
                        Backend - Firebase (Just create some data models and use it's api from react)</div>
                </div>
            </div>
            }
          </>
            )
    }
}

export default BeforeRegister;