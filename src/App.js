// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import CalendarPage from './components/calendarpage';

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Login setAuthenticated={setAuthenticated} />}
                />
                <Route
                    path="/calendar"
                    element={
                        isAuthenticated ? (
                            <CalendarPage />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
