import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Authorization from "./Authorization";

const Home = () => {
    const [constructorId, setConstructorId] = useState('');
    const [document, setDocument] = useState('');
    const [constructors, setConstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/constructors')
            .then(response => {
                setConstructors(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка загрузки данных конструкторов', error);
                setLoading(false);
            });
    }, []);

    const handleLogin = (selectedConstructor) => {
        alert('Пользователь успешно вошел:', selectedConstructor);
        setConstructorId(selectedConstructor.id);
        setDocument(`ГОСТ ${selectedConstructor.name}`);
        navigate('/form');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Authorization
            constructorId={constructorId}
            setConstructorId={setConstructorId}
            constructors={constructors}
            setConstructors={setConstructors}
            onLogin={handleLogin}
        />
    );
}

export default Home;


