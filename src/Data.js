import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const Data = ({ event }) => {

    const [data, setData] = useState({begin: event[0]['originated_at'].slice(0, -11), end: event[0]['originated_at'].slice(0, -17), sport: 'wandern'});

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        setData({
            ...data, // Copy the old fields
            [name]: value // But override this one
          });
      }

      useEffect(() => {
        sessionStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    return (
        <form>
            <label>
                Einsatzbeginn:
                <input type="datetime-local" name="begin" value={data.begin} readOnly />
            </label>
            <label>
                Einsatzende:
                <input type="datetime-local" name="end" value={data.end} onChange={handleInputChange}/>
            </label>
            <label>
                Sportart:
                <select name="sport" value={data.sport} onChange={handleInputChange}>
                    <option value="wandern">Wandern</option>
                    <option value="bergsteigen">Bergsteigen</option>
                    <option value="skifahren">Skifahren</option>
                    <option value="klettern">Klettern</option>
                </select>
            </label>
            <label>
                Einsatzgebiet:
                <input type="text" name="area" />
            </label>
            <label>
                Einsatzort:
                <input type="text" name="location" />
            </label>
            <label>
                Koordinaten:
                <input type="text" name="coordinates" value={event[event.length - 1]['latitude'] + ' / ' + event[event.length - 1]['longitude']} readOnly />
            </label>
            <label>
                Melder:
                <input type="text" name="contact" value={event[event.length - 1]['payload']['data']['caller']['name']} readOnly />
                <input type="text" name="contactTel" value={event[event.length - 1]['payload']['data']['caller']['contact']} readOnly />
            </label>
            <label>Einsatzmerkmale:</label>
            <label>
                <input
                    name="danger"
                    type="checkbox"
                />
                Einsatz unter besonderen Gefahren
            </label>
            <label>
                <input
                    name="kats"
                    type="checkbox"
                />
                Einsatz im Katastrophenfall
            </label>
            <label>
                <input
                    name="avalanche"
                    type="checkbox"
                />
                Lawineneinsatz
            </label>
            <label>
                <input
                    name="search"
                    type="checkbox"
                />
                Sucheinsatz
            </label>
            <label>
                <input
                    name="first-responder"
                    type="checkbox"
                />
                Erstversorgung für den Straßenrettungsdienst
            </label>
            <label>
                <input
                    name="environment"
                    type="checkbox"
                />
                Naturschutz-/Umwelteinsatz
            </label>
            <label>
                <input
                    name="material"
                    type="checkbox"
                />
                Sachbergung
            </label>
        </form>
    );
};

Data.defaultProps = {
    event: []
}

Data.propTypes = {
    event: PropTypes.array.isRequired,
}