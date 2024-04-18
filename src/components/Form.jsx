import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Authorization from "./Authorization";



function Form() {
    const [constructorId, setConstructorId] = useState('');
    const [document, setDocument] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const existingRequestResponse = await axios.get('http://localhost:3000/requests?constructorId=' + constructorId + '&document=' + "ГОСТ " + document);
            const existingRequests = existingRequestResponse.data;

            if (existingRequests.length > 0) {
                alert('Вы уже отправляли заявку на этот документ, она уже была учтена');
            } else {
                const newRequestResponse = await axios.post('http://localhost:3000/requests', {
                    constructorId: constructorId,
                    document: "ГОСТ " + document
                });

                if (newRequestResponse.status === 201) {
                    alert('Заявка успешно отправлена');
                }
            }
        } catch (error) {
            alert('Ошибка при отправке заявки');
            console.error('Ошибка при отправке заявки', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <span className="d-flex justify-content-center">
                <h2 className="h2 m-3">
                    Наименование документа
                    <input className="form-control" type="text" value={document} onChange={e => setDocument(e.target.value)} />
                </h2>
            </span>
            <div className="d-grid gap-2 col-2 mx-auto">
                <button className="btn btn-secondary btn-sm d-flex justify-content-center" type="submit">Отправить заявку</button>
            </div>
        </form>
    );
}

export default Form;
