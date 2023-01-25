import PropTypes from "prop-types";

export const Data = ({ event }) => {

    return (
        <form>
            <label>
                Einsatzbeginn:
                <input type="datetime-local" name="begin" value={event[0]['originated_at'].slice(0, -11)} readOnly />
            </label>
            <label>
                Einsatzende:
                <input type="datetime-local" name="end" />
            </label>
            <label>
                Sportart:
                <select value="wandern">
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