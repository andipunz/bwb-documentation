import React, { useState } from 'react';
import './App.css';

function TableRows({ rows, tableRowRemove, onValUpdate }) {
    return rows.map((rowsData, index) => {
        const { time, message, from, to, action } = rowsData;
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
                <td>
                    <input
                        type="text"
                        value={action}
                        onChange={(event) => onValUpdate(index, event)}
                        name="action"
                        className="form-control"
                    />
                </td>
                <td>
                    <button
                        className="btn btn-dark"
                        onClick={() => tableRowRemove(index)}
                    >
                        Delete Row
                    </button>
                </td>
            </tr>
        );
    });
}
function Table() {
    const [rows, initRow] = useState([{
        time: new Date().toISOString().slice(0, -8),
        message: "",
        from: "",
        to: "",
        action: "",
    }]);
    const addRowTable = (event) => {
        event.preventDefault();
        const data = {
            time: new Date().toISOString().slice(0, -8),
            message: "",
            from: "",
            to: "",
            action: "",
        };
        initRow([...rows, data]);
    };
    const tableRowRemove = (index) => {
        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
    };
    const onValUpdate = (i, event) => {
        const { name, value } = event.target;
        console.log(value);
        const data = [...rows];
        data[i][name] = value;
        initRow([...data.sort((a, b) => new Date(a['time']) - new Date(b['time']))]);
    };
    return (
        <>
            <table style={{ width: "95%" }}>
                <thead>
                    <tr>
                        <th style={{ width: "20%" }}>Uhrzeit</th>
                        <th style={{ width: "20%" }}>Aktion / Meldung</th>
                        <th style={{ width: "20%" }}>Von</th>
                        <th style={{ width: "20%" }}>An</th>
                        <th style={{ width: "20%" }}>Maßnahmen</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRows
                        rows={rows}
                        tableRowRemove={tableRowRemove}
                        onValUpdate={onValUpdate}
                    />
                </tbody>
            </table>
            <button className="btn btn-danger" onClick={addRowTable}>
                Insert Row
            </button>
        </>
    );
}


export const Protocol = () => {

    return (
        <form>
            <Table />
        </form>
    );
};