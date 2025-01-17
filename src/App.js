import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import CalendarPage from './components/calendarpage';
import RegisterScreen from './components/registerScreen';

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<RegisterScreen />}
                />
                <Route
                path="/Login"
                element={<Login />}
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