import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'themes/todo/styles.scss';

export function MainPageView() {
    const [inputText, setInputText] = useState('');
    const [resultMap, setResultMap] = useState<Map<string, string>>(new Map());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter key behavior (e.g., form submission)
            handleProcessText();
        }
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
        <div>
            <div className="container">
                <div className="search-form">
                    <input type="text" className="text-form" value={inputText}
                           onChange={handleInputChange} onKeyDown={handleKeyDown}
                           placeholder="Type to search"/>
                    <button className="button-form" onClick={handleProcessText}>Search</button>
                </div>
                <ul className="list-group">
                    {Array.from(resultMap).map(([title, link], index) => (
                        <li className="list-group-item" key={index}>
                            <a href={link}>{title}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer/>
        </div>
    )
        ;
}
