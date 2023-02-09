import './App.css';
import {SocketProvider} from "./SocketProvider";
import {Documentation} from "./Documentation";
import {BrowserRouter} from "react-router-dom";

const jwt = process.env.REACT_APP_JWT

function App() {
    console.log(jwt)
    return (
        <BrowserRouter>
        <SocketProvider wsUrl='wss://api.services.bergwacht-bayern.org/socket' options={{token: jwt}}>
            <div id="fullscreen">
                <a className="back-button" href="https://passport.services.bergwacht-bayern.org">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <Documentation/>
            </div>
        </SocketProvider>
        </BrowserRouter>);
}

export default App;
