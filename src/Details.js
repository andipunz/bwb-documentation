import React, {useEffect, useState} from 'react';
import './App.css';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";

export const Details = ({events}) => {
    let { id } = useParams();

    const [event, setEvent] = useState([]);

    useEffect(() => {
        if(id && events.get(id) !== undefined) {
            setEvent([...events.get(id).values()]);
            console.log(event);
        }
    }, [events]);

    return (
        <>
            <h1>Alarmdetails</h1>
        </>
    );
};

Details.defaultProps = {
    events: new Map()
}

Details.propTypes = {
    events: PropTypes.object.isRequired
}