import React from 'react'
import { useUser } from './UserProvider'

export default function SavedData() {
    const { getUser } = useUser();

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Center vertically
        backgroundColor: '#282c34'
    };

    const boxStyle = {
        backgroundColor: '#333',
        padding: '40px', // Increase padding for a larger box
        borderRadius: '15px', // Slightly more rounded corners
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Stronger shadow for more depth
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        maxWidth: '1000px', // Increase the width of the box
        fontSize: '18px', // Larger text for better readability
        wordWrap: 'break-word'
    };

    const headingStyle = {
        fontSize: '28px', // Larger heading size
        marginBottom: '20px'
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h1 style={headingStyle}>Saved Data</h1>
                <pre>
                    {getUser ? JSON.stringify(getUser, null, 2) : "No user data"}
                </pre>
            </div>
        </div>
    );
}
