import React, { useEffect, useState } from 'react';
import './App.css';
import PropTypes from "prop-types";

export const Overview = ({ events }) => {

    const [rows, setRows] = useState([]);

    // listening for messages from the channel
    useEffect(() => {

        const temp = [];
        events.forEach((item, index) => {
            const values = [...item.values()];
            const lastItem = values[values.length - 1];
            temp.push(<tr key={index}>
                <td style={{ width: "20%" }}>{values[0]['created_at']}</td>
                <td style={{ width: "20%" }}>{lastItem['extid']}</td>
                <td style={{ width: "20%" }}>{lastItem['payload']['data']['location']['building'] ?? (lastItem['payload']['data']['location']['street'] + ' ' + lastItem['payload']['data']['location']['house'])}</td>
                <td style={{ width: "20%" }}>{lastItem['latitude'] + ' / ' + lastItem['longitude']}</td>
                <td style={{ width: "20%" }}>{lastItem['payload']['data']['caller']['contact']}</td>
            </tr>
            );
        })
        setRows(temp);
    }, [events]);

    return (
        <>
            <h1>Alarmübersicht</h1>

            <table style={{ width: "95%" }}>
                <thead>
                    <tr>
                        <th style={{ width: "20%" }}>Alarmzeit</th>
                        <th style={{ width: "20%" }}>Letztes Update</th>
                        <th style={{ width: "20%" }}>Ort</th>
                        <th style={{ width: "20%" }}>Koordinaten</th>
                        <th style={{ width: "20%" }}>Rückrufnummer</th>
                    </tr>
                </thead>
                <tbody id="events-rows">
                    {rows}
                </tbody>
            </table>
        </>
    );
};

Overview.defaultProps = {
    events: new Map()
}

Overview.propTypes = {
    events: PropTypes.object.isRequired,
}