import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from "./components/Form";
import Table from "./components/Table";
import Home from "./components/Home";


function App() {


    return (
        <Router>
            <div>
<div className="col-3 p-3 mb-2">
                <p><a className="link-opacity-10" href="#"><Link to="/">Выбрать Конструктора</Link></a></p>
                <p><a className="link-opacity-10" href="#"> <Link to="/table">Таблица заявок</Link></a></p>
</div>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Form" element={<Form/>}/>
                        <Route path="/table" element={<Table/>}/>
                    </Routes>
            </div>
        </Router>
);
}

export default App;
