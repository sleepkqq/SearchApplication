import React from 'react';

interface AppBarProps {
    title: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
    return (
        <div className="app-bar">
            <div className="app-bar-title">{title}</div>
        </div>
    );
};

export default AppBar;