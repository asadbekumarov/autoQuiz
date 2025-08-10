// import React from 'react'
// import { RxPencil1 } from "react-icons/rx"
// import { RiDeleteBin5Line } from "react-icons/ri"
// import { FaPlus } from "react-icons/fa6";
// import { IoEyeOutline } from "react-icons/io5";
// import { LiaSaveSolid } from "react-icons/lia";
// import { MdOutlineSaveAlt } from "react-icons/md";

// function CreateTestPage() {
//     return (
//         <section className="bg-green-50 min-h-screen py-8 px-4">
//             <div className="max-w-5xl mx-auto">
//                 <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-6">
//                         Test yaratish
//                     </h1>

//                     {/* Savol preview */}
//                     <div className="bg-white border-2 rounded-lg p-6 mb-6 flex justify-between items-center">
//                         <h3 className="text-xl font-semibold text-gray-800">
//                             Savol 1
//                         </h3>
//                         <div className="flex items-center space-x-3">
//                             <button className="text-gray-600 hover:text-blue-600 transition">
//                                 <RxPencil1 className="text-2xl" />
//                             </button>
//                             <button className="text-gray-600 hover:text-red-600 transition">
//                                 <RiDeleteBin5Line className="text-2xl" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Yangi savol kiritish formasi */}
//                     <div className="bg-white rounded-lg border-2 p-6 space-y-6 mb-6">
//                         <input
//                             type="text"
//                             placeholder="Savol matni"
//                             className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                         />
//                         <div className="flex flex-wrap md:flex-nowrap gap-6">
//                             <div className="w-full flex flex-col gap-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Javob 1"
//                                     className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Javob 2"
//                                     className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                                 />
//                             </div>
//                             <div className="w-full flex flex-col gap-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Javob 3"
//                                     className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Javob 4"
//                                     className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                                 />
//                             </div>
//                         </div>
//                         <div className="text-center w-full">
//                             <button className="w-full flex justify-center items-center gap-2 border-2 border-dashed border-green-400 py-3 rounded-lg text-green-700 hover:bg-green-50 transition">
//                                 <FaPlus />
//                                 Savol qo'shish
//                             </button>
//                         </div>
//                     </div>

//                     {/* Statistik va action tugmalar */}
//                     <div className="bg-white p-4 rounded-lg border-2 flex items-center justify-between">
//                         <p className="text-gray-800 font-medium">1 ta savol yaratildi</p>
//                         <div className="flex flex-wrap gap-4">
//                             <button className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 flex items-center gap-2 transition">
//                                 <IoEyeOutline />

//                                 Ko‘rish
//                             </button>
//                             <button className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 flex items-center gap-2 transition">
//                                 <LiaSaveSolid />

//                                 Saqlash
//                             </button>
//                             <button className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 flex items-center gap-2 transition">
//                                 <MdOutlineSaveAlt />

//                                 Yuklab olish
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default CreateTestPage
import React, { useState, useEffect } from 'react';
import { RxPencil1 } from 'react-icons/rx';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';
import { IoEyeOutline } from 'react-icons/io5';
import { LiaSaveSolid } from 'react-icons/lia';
import { MdOutlineSaveAlt } from 'react-icons/md';

function CreateTestPage() {
    const [questions, setQuestions] = useState(() => {
        const saved = localStorage.getItem('autoquiz-questions');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        text: '',
        answers: ['', '', '', ''],
    });

    // Savollarni localStorage ga yozish
    useEffect(() => {
        localStorage.setItem('autoquiz-questions', JSON.stringify(questions));
    }, [questions]);

    const handleInputChange = (index, value) => {
        const updatedAnswers = [...currentQuestion.answers];
        updatedAnswers[index] = value;
        setCurrentQuestion({ ...currentQuestion, answers: updatedAnswers });
    };

    const handleAddQuestion = () => {
        if (currentQuestion.text.trim() === '') return;
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({ text: '', answers: ['', '', '', ''] });
    };

    const handleDelete = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(questions, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'autoquiz-test.json';
        link.click();
    };

    return (
        <section className="bg-green-50 min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Test yaratish</h1>

                    {/* Real vaqtda chiqayotgan savollar */}
                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="bg-white border-2 rounded-lg p-4 mb-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {index + 1}. {q.text}
                                </h3>
                                <ul className="list-disc pl-6 text-gray-600 mt-1">
                                    {q.answers.map((a, i) => (
                                        <li key={i}>{a}</li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => handleDelete(index)} className="text-red-600">
                                <RiDeleteBin5Line className="text-2xl" />
                            </button>
                        </div>
                    ))}

                    {/* Yangi savol formasi */}
                    <div className="bg-white rounded-lg border-2 p-6 space-y-6 mb-6">
                        <input
                            type="text"
                            placeholder="Savol matni"
                            value={currentQuestion.text}
                            onChange={(e) =>
                                setCurrentQuestion({ ...currentQuestion, text: e.target.value })
                            }
                            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
                        />

                        <div className="flex flex-wrap md:flex-nowrap gap-6">
                            {currentQuestion.answers.map((ans, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder={`Javob ${i + 1}`}
                                    value={ans}
                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
                                />
                            ))}
                        </div>

                        <div className="text-center w-full">
                            <button
                                onClick={handleAddQuestion}
                                className="w-full flex justify-center items-center gap-2 border-2 border-dashed border-green-400 py-3 rounded-lg text-green-700 hover:bg-green-50 transition"
                            >
                                <FaPlus /> Savol qo‘shish
                            </button>
                        </div>
                    </div>

                    {/* Statistik va tugmalar */}
                    <div className="bg-white p-4 rounded-lg border-2 flex items-center justify-between">
                        <p className="text-gray-800 font-medium">
                            {questions.length} ta savol yaratildi
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {/* Ko‘rish (real-time preview) */}
                            <button
                                onClick={() => alert(JSON.stringify(questions, null, 2))}
                                className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 flex items-center gap-2 transition"
                            >
                                <IoEyeOutline /> Ko‘rish
                            </button>

                            {/* Saqlash localStorage */}
                            <button className="bg-green-500 text-white px-5 py-2 rounded flex items-center gap-2 transition">
                                <LiaSaveSolid /> Saqlandi
                            </button>

                            {/* Yuklab olish */}
                            <button
                                onClick={handleDownload}
                                className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 flex items-center gap-2 transition"
                            >
                                <MdOutlineSaveAlt /> Yuklab olish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateTestPage;
