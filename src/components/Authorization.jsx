import React, { useEffect, useState } from 'react';
import axios from "axios";

const Authorization = ({ onLogin, constructors, constructorId, setConstructorId, setConstructors }) => {
    const handleLogin = () => {
        const selectedConstructor = constructors.find(constructor => constructor.id === constructorId);
        onLogin(selectedConstructor);
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!constructors || constructors.length === 0) {
            setLoading(true);

            axios.get('http://localhost:3000/constructors')
                .then(response => {
                    setConstructors(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.error('Ошибка загрузки данных конструкторов', error);
                });
        }
    }, [constructors, setConstructors]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="d-flex justify-content-center">
                        <div className="d-grid gap-2 col-2 mx-auto">
                            <h4>ФИО конструктора</h4>
                            <select className="form-select mx-auto d-inline-block" value={constructorId}
                                    onChange={(e) => setConstructorId(e.target.value)}>
                                <option value="">Выберите конструктора</option>
                                {constructors.map(constructor => (
                                    <option key={constructor.id} value={constructor.id}>{constructor.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-grid gap-2 col-2 mx-auto">
                        <button className="btn btn-secondary btn-sm d-flex justify-content-center" onClick={handleLogin}>
                            Войти
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Authorization;
