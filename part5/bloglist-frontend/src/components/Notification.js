import React from 'react'

const Notification = ({cls,msg}) => {
    console.log(`class ${cls} message ${msg}`);
    return (
        <div className={cls}>{msg}</div>
    )
}

export default Notification