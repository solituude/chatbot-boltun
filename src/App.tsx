import React from 'react';
import './App.css';
import {Chat} from "./ui/chat/chat";

function App() {
    return (
        <div className="app">
            <header className="App-header">
                Чат-бот Болтун
            </header>

            <Chat/>
        </div>
    );
}

export default App;
