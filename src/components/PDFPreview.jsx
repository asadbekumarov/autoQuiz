import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const PDFPreview = ({ questions, questionsPerPage, onEdit, onDelete }) => {
    const [imgData, setImgData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const previewRef = useRef();
    const [openMenu, setOpenMenu] = useState(null);

    // Calculate total pages
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const maxQuestionsPerPage = 10;

    useEffect(() => {
        if (!questions.length) {
            setImgData(null);
            return;
        }

        setIsLoading(true);
        // Only preview the current page for performance
        html2canvas(previewRef.current, { scale: 1.5, useCORS: true, allowTaint: true }).then(canvas => {
            setImgData(canvas.toDataURL('image/png'));
            setIsLoading(false);
        }).catch(error => {
            console.error('PDF preview error:', error);
            toast.error('PDF ko\'rinishi yaratishda xatolik!');
            setIsLoading(false);
        });
    }, [questions, questionsPerPage, currentPage]);

    // Get questions for current page
    const startIndex = currentPage * maxQuestionsPerPage;
    const endIndex = startIndex + maxQuestionsPerPage;
    const pageQuestions = questions.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div>
                <h3 className="font-bold text-xl sm:text-2xl text-blue-900 drop-shadow">PDF Ko'rinishi:</h3>
                {totalPages > 1 && (
                    <div>
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className={`px-4 sm:px-6 py-2 rounded-lg text-lg font-bold shadow transition-colors ${currentPage === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-700 text-white hover:bg-blue-800'
                                }`}
                        >
                            ← Oldingi
                        </button>
                        <span className="text-base sm:text-lg font-semibold text-gray-700">
                            Sahifa {currentPage + 1} / {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1}
                            className={`px-4 sm:px-6 py-2 rounded-lg text-lg font-bold shadow transition-colors ${currentPage === totalPages - 1
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-700 text-white hover:bg-blue-800'
                                }`}
                        >
                            Keyingi →
                        </button>
                    </div>
                )}
            </div>

            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <div
                    ref={previewRef}
                    style={{
                        width: '800px',
                        padding: '40px',
                        fontSize: '16px',
                        fontFamily: 'Arial, sans-serif',
                        background: 'white',
                        color: 'black',
                        borderRadius: '8px',
                        boxShadow: '0 0 8px #ccc',
                    }}
                >
                    {/* <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
                        Test Savollari
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                        Sahifa {currentPage + 1} / {totalPages}
                    </div> */}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {pageQuestions.map((q, idx) => (
                            <div key={q.id} style={{
                                padding: '18px',
                                borderRadius: '10px',
                                breakInside: 'avoid',
                                fontSize: '18px',
                                position: 'relative',
                                background: '#f3f4f6',
                                boxShadow: '0 2px 8px #e0e7ef',
                                border: '2px solid #2563eb',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e293b' }}>
                                        {startIndex + idx + 1}. {q.question}
                                    </span>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setOpenMenu(openMenu === q.id ? null : q.id)}
                                            style={{ background: '#2563eb', border: 'none', color: 'white', cursor: 'pointer', fontSize: '22px', borderRadius: '6px', padding: '4px 10px', boxShadow: '0 1px 4px #b6c6e6' }}
                                            title="Amallar"
                                        >
                                            ⋮
                                        </button>
                                        {openMenu === q.id && (
                                            <div style={{ position: 'absolute', right: 0, top: '110%', background: 'white', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px #e0e7ef', zIndex: 10, minWidth: '120px' }}>
                                                <button
                                                    onClick={() => { setOpenMenu(null); onEdit(q); }}
                                                    style={{ display: 'block', width: '100%', padding: '10px', background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '16px', textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                                                >
                                                    ✏️ Tahrirlash
                                                </button>
                                                <button
                                                    onClick={() => { setOpenMenu(null); onDelete(q.id); }}
                                                    style={{ display: 'block', width: '100%', padding: '10px', background: 'none', border: 'none', color: '#dc2626', fontWeight: 'bold', fontSize: '16px', textAlign: 'left', cursor: 'pointer' }}
                                                >
                                                    ❌ O'chirish
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ marginLeft: '16px' }}>
                                    <div style={{ margin: '4px 0', fontSize: '16px', color: '#334155' }}>A) {q.options.A}</div>
                                    <div style={{ margin: '4px 0', fontSize: '16px', color: '#334155' }}>B) {q.options.B}</div>
                                    {q.options.C && <div style={{ margin: '4px 0', fontSize: '16px', color: '#334155' }}>C) {q.options.C}</div>}
                                    {q.options.D && <div style={{ margin: '4px 0', fontSize: '16px', color: '#334155' }}>D) {q.options.D}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 italic">PDF ko'rinishi yaratilmoqda...</div>
                </div>
            ) : imgData ? (
                <div className="w-full overflow-x-auto">
                    <img
                        src={imgData}
                        alt="PDF Preview"
                        style={{ background: 'white' }}
                    />
                </div>
            ) : (
                <div className="text-gray-400 italic text-center py-8">Savollar kiritilganda PDF ko'rinishi shu yerda chiqadi.</div>
            )}
        </div>
    );
};

export default PDFPreview;