import React, { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import './App.css';
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Data } from './Data';
import { Resources } from './Resources';
import { Protocol } from './Protocol';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { Members } from './Members';

export const Details = ({ events }) => {
    let { id } = useParams();

    const [event, setEvent] = useState([]);

    useEffect(() => {
        if (id && events.get(id) !== undefined) {
            setEvent([...events.get(id).values()]);
            console.log(event);
        }
    }, [events]);

    if (event.length < 1) {
        return null;
    }

    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Einsatzdaten</Tab>
                    <Tab>Patienten</Tab>
                    <Tab>Einsatzkräfte</Tab>
                    <Tab>Einsatzmittel</Tab>
                    <Tab>Protokoll</Tab>
                </TabList>

                <TabPanel>
                    <Data event={event} />
                </TabPanel>
                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <Members />
                </TabPanel>
                <TabPanel>
                    <Resources event={event} />
                </TabPanel>
                <TabPanel>
                    <Protocol />
                </TabPanel>
            </Tabs>

        </>
    );
};

Details.defaultProps = {
    events: new Map()
}

Details.propTypes = {
    events: PropTypes.object.isRequired
}