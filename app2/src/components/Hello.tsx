import React from 'react'

interface HelloProps {
    text: string;
}

const Hello = ({text}: HelloProps) => {
    return <h1>Hello {text}</h1>
}

export default Hello
