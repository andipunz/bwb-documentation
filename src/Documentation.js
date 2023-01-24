import './App.css';

import {
    Routes,
    Route,
    Outlet
} from "react-router-dom";

import {Overview} from "./Overview";
import {Details} from "./Details";
import {useChannel} from "./useChannel";
import {useEffect, useState} from "react";

export const Documentation = () => {
    const channelName = 'eventhub';
    const reducer = (state, {event, payload}) => {
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
    const [events, setEvents] = useState(new Map());

    // listening for messages from the channel
    useEffect(() => {
        if (state !== undefined) {
            state.forEach(item => {
                    setEvents(prevState => {
                        if (prevState.has(item['extid'])) {
                            if (!prevState.get(item['extid']).has(item['id'])) {
                                prevState.get(item['extid']).set(item['id'], item);
                            }
                        } else {
                            prevState.set(item['extid'], new Map().set(item['id'], item))
                        }
                        return new Map(prevState);
                    });
                }
            )
        }
    }, [state]);

    // pushing messages to the channel
    useEffect(() => {
        broadcast('catchup', {replay: '2023-01-21'});
    }, [broadcast]);
    // here, we only push to the channel once on initial render
    // but when you push to the channel will vary across use cases
    return (
        <>
            <Routes>
                <Route path="/" element={<div className="content"><Outlet /></div>}>
                    <Route index element={<Overview events={events} />} />
                    <Route path="/details/:id" element={<Details events={events}/>} />
                </Route>
            </Routes>
            </>
    );
}
