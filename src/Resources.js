import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

export const Resources = ({ event }) => {

    const [rows, setRows] = useState([]);

    // listening for messages from the channel
    useEffect(() => {

        const temp = [];
        event[event.length - 1]['payload']['data']['vehicles'].forEach((item, index) => {
            temp.push(<tr key={index}>
                <td style={{ width: "20%" }}>{new Date(item['alarmedTime']).toLocaleString('de-DE')}</td>
                <td style={{ width: "20%" }}>{item['name']}</td>
                <td style={{ width: "20%" }}><input type="text" /></td>
            </tr>
            );
        })
        setRows(temp);
    }, [event]);

    return (
        <>
            <table style={{ width: "95%" }}>
                <thead>
                    <tr>
                        <th style={{ width: "20%" }}>Alarmzeit</th>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "60%" }}>Notiz</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <form>
                <label>
                    <input
                        name="akja"
                        type="checkbox"
                    />
                    Akja
                </label>
                <label>
                    <input
                        name="stretcher"
                        type="checkbox"
                    />
                    Gebirgstrage
                </label>
                <label>
                Sonstiges:
                <input type="text" name="other" />
            </label>
            </form>
        </>
    );
};

Resources.defaultProps = {
    event: []
}

Resources.propTypes = {
    event: PropTypes.array.isRequired,
}