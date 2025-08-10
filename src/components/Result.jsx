import React from 'react'
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { PiMedalLight } from "react-icons/pi";

function Result() {
    return (
        <section className="max-w-7xl mx-auto p-4">
            <div className="flex justify-evenly gap-8">
                <div className="p-6 flex flex-col flex-wrap items-center text-center">
                    <LuFileSpreadsheet className="text-4xl text-green-600 bg-green-100 p-3 w-16 h-16 rounded-full mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        1,247

                    </h2>
                    <p className="text-gray-600">
                        Yaratilgan testlar

                    </p>
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                    <IoPeopleOutline className="text-4xl text-green-600 bg-green-100 p-3 w-16 h-16 rounded-full mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        523

                    </h2>
                    <p className="text-gray-600">
                        O'qituvchilar

                    </p>
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                    <PiMedalLight className="text-4xl text-green-600 bg-green-100 p-3 w-16 h-16 rounded-full mb-4" />

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        89
                    </h2>
                    <p className="text-gray-600">
                        Saqlangan andozalar
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Result