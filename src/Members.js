import React, { useState } from 'react';
import './App.css';

function TableRows({ rows, onValUpdate }) {
    return rows.map((rowsData, index) => {
        const { name, unit, heli, winch, rope, special } = rowsData;
        return (
            <tr key={index}>
                <td>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => onValUpdate(index, event)}
                        name="name"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={unit}
                        onChange={(event) => onValUpdate(index, event)}
                        name="unit"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        value={heli}
                        onChange={(event) => onValUpdate(index, event)}
                        name="from"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        value={winch}
                        onChange={(event) => onValUpdate(index, event)}
                        name="winch"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        value={rope}
                        onChange={(event) => onValUpdate(index, event)}
                        name="rope"
                        className="form-control"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={special}
                        onChange={(event) => onValUpdate(index, event)}
                        name="special"
                        className="form-control"
                    />
                </td>
            </tr>
        );
    });
}
function Table() {
    const [rows, initRow] = useState([{
        name: "",
        unit: "",
        heli: false,
        winch: false,
        rope: false,
        special: "",
    }]);
    const addRowTable = (event) => {
        event.preventDefault();
        const data = {
            name: "",
            unit: "",
            heli: false,
            winch: false,
            rope: false,
            special: "",
        };
        initRow([...rows, data]);
    };
    const onValUpdate = (i, event) => {
        const { name, value } = event.target;
        console.log(value);
        const data = [...rows];
        data[i][name] = value;
        initRow([...data]);
    };
    return (
        <>
            <table style={{ width: "95%" }}>
                <thead>
                    <tr>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "20%" }}>Bergwacht</th>
                        <th style={{ width: "10%" }}>Mitflug</th>
                        <th style={{ width: "10%" }}>Winde</th>
                        <th style={{ width: "10%" }}>Tau</th>
                        <th style={{ width: "30%" }}>Spezialeinsatzkraft</th>
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
        </>
    );
}


export const Members = () => {

    return (
        <form>
            <Table />
        </form>
    );
};