import './App.css';

import {
    Routes,
    Route,
    Outlet
} from "react-router-dom";

import {Details} from "./Details";

export const Documentation = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<div className="content"><Outlet /></div>}>
                    <Route index element={<p>/details/:id needed</p>} />
                    <Route path="/details/:id" element={<Details />} />
                </Route>
            </Routes>
            </>
    );
}
