import React from 'react'

function Header() {
    return (
        <div className='flex justify-between items-center p-4 bg-blue-900 text-white'>
            <h1>AutoQuiz</h1>
            <div className='flex gap-4 items-center justify-between' >
                <p>Test yaratish</p>
                <p>Shablonlar</p>
                <button>Saqlash</button>
            </div>
        </div>
    )
}

export default Header