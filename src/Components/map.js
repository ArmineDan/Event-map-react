/* eslint-disable react/react-in-jsx-scope */
import React, {useState, useEffect}  from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";





export const MapWithAMarker = withGoogleMap((props) => {
    //debugger;
    const [showInfoWindow , setVisibility] = useState(false);
    const [center, setCenter] = useState(null);

    function mouseover() {
        //console.log(this.getTitle())
        setVisibility(this.getTitle())
    }
    function mouseOut() {
        setVisibility(false)
    }
    function change() {
        setCenter(true)
    }
    useEffect(() => {
        setCenter(null);
        return () => {
        }
    }, [props]);

    const marker = props.position.map((item, index) => {
            return (
                <Marker
                    key={index}
                    position={{lat: +item.latitude, lng: +item.longitude}}
                    onMouseOver={mouseover}
                    onMouseOut={mouseOut}
                    title={item.name}

                >
                    {showInfoWindow === item.name  && (
                        <InfoWindow >
                            <div className="marker-info"> <div className="address-title">{item.name}</div> <div >{item.address.localized_address_display}</div></div>
                        </InfoWindow>
                    )}
                </Marker>
            )
        }
    );
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={props.position.length ? {
                lat: +props.position[0].latitude,
                lng: +props.position[0].longitude,
            } : {}}
            center={!center && props.position.length ? {
                lat: +props.position[Math.floor(props.position.length / 2)].latitude,
                lng: +props.position[Math.floor(props.position.length / 2)].longitude,
            } : null}
            onCenterChanged={change}
        >
            {marker}
        </GoogleMap> )
});
