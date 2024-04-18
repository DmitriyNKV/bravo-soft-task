import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/requests')
            .then(response => {
                const counts = {};
                response.data.forEach(req => {
                    if (counts[req.document]) {
                        counts[req.document]++;
                    } else {
                        counts[req.document] = 1;
                    }
                });
                const countsArray = Object.keys(counts).map(document => ({ document, count: counts[document] }));
                setRequests(countsArray);
            })
            .catch(error => console.error('Ошибка загрузки заявок', error));
    }, []);

    return (
        <div className="d-grid gap-2 m-3  col-8 mx-auto">
        <table className="table">
            <thead>
            <tr>
                <th >Наименование документа</th>
                <th >Количество заявок</th>
            </tr>
            </thead>
            <tbody>
            {requests.map((request, index) => (
                <tr key={index}>
                    <td>{request.document}</td>
                    <td>{request.count}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Table;
