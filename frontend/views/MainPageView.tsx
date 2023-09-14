import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MainPageView() {
    const [inputText, setInputText] = useState('');
    const [resultMap, setResultMap] = useState<Map<string, string>>(new Map());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleProcessText = () => {
        if (inputText.trim() === "") {
            // Отображаем всплывающее уведомление об ошибке
            toast.error("Текст пустой. Введите текст перед отправкой.", {
                position: "top-right",
                autoClose: 3000, // Закрыть уведомление через 3 секунды
            });
            return;
        }

        // Отправка запроса на сервер при нажатии кнопки
        axios.post('/api/search', inputText)
            .then((response) => {
                setResultMap(new Map(Object.entries(response.data)));
            })
            .catch((error) => {
                console.error('Ошибка при запросе на сервер:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control" value={inputText} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary" onClick={handleProcessText}>Search</button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <ul className="list-group">
                        {Array.from(resultMap).map(([title, link], index) => (
                            <li className="list-group-item" key={index}>
                                <a href={link}>{title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
