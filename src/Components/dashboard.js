import React from 'react';
import {fire}  from '../firebase/firebaseManager';
import {getEventsCoordinates} from './axios';
import Loader from './loder';
import {connect} from 'react-redux';
import {MapWithAMarker} from './map'


class Dashboard extends React.Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            user_verified: false,
            show_loading:false,
            city_name: '',
            err: '',
            api_res: [{
                latitude: 40.151872,
                longitude: 44.496869,
                name: "Bee Web",
                address:{
                  localized_address_display:'34 Garegin Nzhdeh St, Yerevan 0026'
                }
            }]

        }
    }

    componentDidMount() {
        this._isMounted = true;
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                if (!user.emailVerified) {
                    const currentUser = fire.auth().currentUser;
                    currentUser.sendEmailVerification()
                        .then(function () {

                        }).catch(function (error) {
                        // An error happened.
                    });
                }
                if(this._isMounted) {
                    this.setState({
                        user_verified: user.emailVerified,
                    });
                }

            } else {
                this.props.history.push('/')
            }
        });

    }
    componentWillUnmount() {
        this._isMounted = false;
    }


    getCityName = (e) => {
        const {events} = this.props;
        if(events.length){
            this.props.reset_event_list();
        }

        this.setState({
            city_name: e.target.value,
            err: ''
        })
    };

    onEnter = (e) => {
        const {city_name} = this.state;
        if (e.which === 13) {
            this.setState({
                show_loading:true
            });
            getEventsCoordinates(city_name)
                .then((response) => {
                    if (response.length) {
                        this.setState({
                            api_res: response,
                            city_name: '',
                            show_loading:false,

                        });
                        this.props.get_event_list(response)
                    }
                    else {
                        this.setState({
                            err: 'No event data or the city name is wrong!!',
                            city_name: '',
                            show_loading:false,
                            api_res: [{
                                latitude: 40.151872,
                                longitude: 44.496869,
                                name: "Bee Web",
                                address:{
                                    localized_address_display:'34 Garegin Nzhdeh St, Yerevan 0026'
                                }
                            }]
                        })
                    }

                })
                .catch((err) => {
                    this.setState({
                        err: err
                    })
                })
        }

    };

    logOut = () => {
        fire.auth().signOut().then(function () {
            this.props.history.push('/')
        }).catch(function (error) {
            // An error happened.
        });
    };

    render() {

        const {city_name, user_verified, api_res, err, show_loading} = this.state;
        const {events} = this.props;
        const events_table= events.map((item,index)=>{
            return(
                <tr key={index}>
                    <td> {++index}</td>
                    <td> {item.name}</td><td style={{width:'20%'}}>{item.address.localized_address_display}</td>
                    <td style={{fontSize:'12px'}}> {item.decr}</td>
                </tr>
            )
        })

        return (
            <div>
                {this._isMounted && <>
                { user_verified ?
                    <>
                    {show_loading?<Loader/>:null}
                    <div className="form-style-5-dash">
                        <div className="flex">
                            <input type="text" value={city_name} onChange={this.getCityName} onKeyPress={this.onEnter}
                                   placeholder="Enter the City name"/>
                            <i className="icon-line-cross"/>
                            <input type="button" className="btn btn-info" onClick={this.logOut} value={'Log Out'}/>
                        </div>
                        {err && <span className="err-info">{err}</span>}
                    </div>
                    <MapWithAMarker
                        position={api_res}
                        containerElement={<div style={{height: `400px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                    />
                    {events.length?<>
                    <div className="search-res">{`We found ${events.length} events `}</div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Description</th>

                        </tr>
                        </thead>
                        <tbody>
                        {events_table}
                        </tbody>
                    </table>


                    </>
                    :null}

                    </> : <div className="verify-text">
                        <h3>We have sent a confirmation link to your email address.
                            Please log in to your email account. </h3>
                    </div>
                }</>}
            </div>
        );
    }

}

const store = store => ({
    events: store.events,
    });

const dispatch = dispatch => ({
    get_event_list:list => dispatch({type:'GET_EVETS_LISTS', payload:list}),
    reset_event_list:list => dispatch({type:'RESET_EVETS_LISTS', payload:list}),
});

export default connect(
    store,
    dispatch
)(Dashboard)
