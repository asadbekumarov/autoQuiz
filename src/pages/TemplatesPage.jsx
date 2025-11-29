// // src/pages/TemplatesPage.js
// import { MdAssignment } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';

// const TemplatesPage = () => {
//     const navigate = useNavigate();

//     const handleUseTemplate = (template) => {
//         // Shablonni localga saqlash orqali CreateTest sahifasiga o'tkazish
//         localStorage.setItem('templateToUse', JSON.stringify(template));
//         navigate('/create');
//     };

//     const templates = [
//         {
//             id: 1,
//             title: 'Savolingizni kiriting',
//             options: [
//                 '20 ta savol',
//                 'Turli mavzular',
//                 "Oson va o'rta darajadagi savollar",
//             ],
//         },
//         // Shu yerga boshqa shablonlarni qo'shish mumkin
//     ];

//     return (
//         <div className="bg-green-50 min-h-screen py-8 px-4">
//             <div className="max-w-6xl mx-auto">
//                 <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-2 text-center">
//                     <MdAssignment className="mr-2" />
//                     Test Shablonlari
//                 </h1>
//                 <p className="text-center text-gray-600 mb-8">
//                     Tayyor shablonlardan foydalanib tezda test yarating!
//                 </p>

//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
//                     {templates.map((template) => (
//                         <div
//                             key={template.id}
//                             className="bg-white rounded-lg shadow-md p-6 flex flex-col cursor-pointer hover:shadow-lg transition"
//                             onClick={() => handleUseTemplate(template)}
//                         >
//                             <h2 className="text-xl font-semibold text-gray-800 mb-4">{template.title}</h2>
//                             <ul className="list-disc list-inside text-gray-700">
//                                 {template.options.map((option, idx) => (
//                                     <li key={idx} className="mb-2">
//                                         {String.fromCharCode(97 + idx)}) {option}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TemplatesPage;
// src/pages/TemplatesPage.js
import { MdAssignment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    localStorage.setItem('templateToUse', JSON.stringify(template));
    navigate('/create');
  };

  const templates = [
    {
      id: 1,
      type: 'Multiple Choice',
      title: 'Multiple Choice',
      description: 'Bitta to‘g‘ri javobli savollar.',
      options: ['Variant 1', 'Variant 2', 'Variant 3', 'Variant 4'],
    },
    {
      id: 2,
      type: 'Multiple Answers',
      title: 'Multiple Answers',
      description: 'Bir nechta to‘g‘ri javobli savollar.',
      options: ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
    },
    {
      id: 3,
      type: 'True / False',
      title: 'True / False',
      description: 'To‘g‘ri yoki noto‘g‘ri savollar.',
      options: ['True', 'False'],
    },
    {
      id: 4,
      type: 'Short Answer',
      title: 'Short Answer',
      description: 'Qisqa matn javobli savollar.',
      options: ['_________________'],
    },
    {
      id: 5,
      type: 'Fill in the Blanks',
      title: 'Fill in the Blanks',
      description: 'Bo‘sh joyni to‘ldirish savollari.',
      options: ['The capital of ___ is ___'],
    },
    {
      id: 6,
      type: 'Numeric Answer',
      title: 'Numeric Answer',
      description: 'Raqamli javobli savollar.',
      options: ['12 × 8 = ___'],
    },
    {
      id: 7,
      type: 'Matching',
      title: 'Matching',
      description: 'Moslashtirish (Chap va O‘ng).',
      options: ['HTML → Strukturasi', 'CSS → Dizayn', 'JS → Interaktivlik'],
    },
    {
      id: 8,
      type: 'Ordering',
      title: 'Ordering',
      description: 'Ketma-ketlik bo‘yicha joylashtirish.',
      options: ['1️⃣ Muammoni tahlil qilish', '2️⃣ Kod yozish', '3️⃣ Testlash', '4️⃣ Joylashtirish'],
    },
    {
      id: 9,
      type: 'Image-based',
      title: 'Image-based',
      description: 'Rasm asosida savollar.',
      options: ['🐶 It', '🐱 Mushuk', '🦁 Sher', '🐵 Maymun'],
    },
    {
      id: 10,
      type: 'Essay',
      title: 'Essay',
      description: 'Erkin javob yozish.',
      options: ['Internetning inson hayotidagi o‘rni haqida yozing.'],
    },
    {
      id: 11,
      type: 'Matrix',
      title: 'Matrix',
      description: 'Jadval shaklidagi testlar.',
      options: ['Savol 1 → Ha/Yo‘q', 'Savol 2 → Ha/Yo‘q', 'Savol 3 → Ha/Yo‘q'],
    },
  ];

  return (
    <div className="bg-green-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-2 text-center">
          <MdAssignment className="mr-2" />
          Test Shablonlari
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Tayyor shablonlardan foydalanib tezda test yarating!
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => handleUseTemplate(template)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{template.title}</h2>
              <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
              <ul className="list-disc list-inside text-gray-700">
                {template.options.map((option, idx) => (
                  <li key={idx} className="mb-2">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
