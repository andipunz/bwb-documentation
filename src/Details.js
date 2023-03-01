import React, { useEffect, useState } from 'react';
import './App.css';
import { useParams } from "react-router-dom";
import { useChannel } from "./useChannel";

function TableRows({ rows, onValUpdate }) {
    return rows.map((rowsData, index) => {
        const { time, message, from, to } = rowsData;
        return (
            <tr key={index}>
                <td>
                    <input
                        type="datetime-local"
                        value={time}
                        onChange={(event) => onValUpdate(index, event)}
                        name="time"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={message}
                        onChange={(event) => onValUpdate(index, event)}
                        name="message"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={from}
                        onChange={(event) => onValUpdate(index, event)}
                        name="from"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={to}
                        onChange={(event) => onValUpdate(index, event)}
                        name="to"
                        className="form-control"
                    />
                </td>
            </tr>
        );
    });
}

export const Details = () => {

    const channelName = 'eventhub';
    const reducer = (state, { event, payload }) => {
        // the second argument is the message sent over the channel
        // it will contain an event key and a payload key
        switch (event) {
            case 'events.update':
                return payload.events
        }
    }
    // connect to the channel via our hook
    // the channel name is defined by the server
    const [state, broadcast] = useChannel(channelName, reducer, []);
    const [events, setEvents] = useState([]);
    const [ids, setIds] = useState([]);

    // listening for messages from the channel
    useEffect(() => {
        if (state !== undefined) {
            state.forEach(item => {
                console.log(item);
                if (!ids.includes(item.id)) {
                    if(item.subkind === "New"){

                    }




                    setEvents(prevState => {
                        if (prevState.find(prev => prev.id === item.id) === undefined) {
                            prevState.push(item)
                            return [...prevState.sort((a, b) => a.id - b.id)];
                        }
                        return prevState
                    });
                    setIds(prevState => [...prevState, item.id]);
                }
            });
        }
    }, [state]);

    let { id } = useParams();

    // pushing messages to the channel
    useEffect(() => {
        broadcast('catchup', { extid: id });
    }, [broadcast, id]);
    // here, we only push to the channel once on initial render
    // but when you push to the channel will vary across use cases

    const [rows, initRow] = useState([{
        time: new Date().toISOString().slice(0, -8),
        message: "",
        from: "",
        to: "",
    }]);

    const addRowTable = (event) => {
        event.preventDefault();
        const data = {
            time: new Date().toISOString().slice(0, -8),
            message: "",
            from: "",
            to: "",
        };
        initRow([...rows, data]);
    };

    const onValUpdate = (i, event) => {
        const { name, value } = event.target;
        console.log(value);
        const data = [...rows];
        data[i][name] = value;
        initRow([...data.sort((a, b) => new Date(a['time']) - new Date(b['time']))]);
    };

    if (events.length < 1) {
        return null;
    }

    return (
        <>
            <form>
                <table style={{ width: "95%" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Uhrzeit</th>
                            <th style={{ width: "50%" }}>Aktion / Meldung</th>
                            <th style={{ width: "15%" }}>Von</th>
                            <th style={{ width: "15%" }}>An</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows
                            rows={rows}
                            onValUpdate={onValUpdate}
                        />
                    </tbody>
                </table>
                <button className="btn btn-danger" onClick={addRowTable}>
                    Neue Zeile
                </button>
            </form>

        </>
    );
};