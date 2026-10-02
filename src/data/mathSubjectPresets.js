/**
 * Tayyor matematika, algebra va geometriya test shablonlari
 * O'qituvchilar 1 marta bosish bilan to'liq testni yuklashlari mumkin.
 */

export const mathSubjectPresets = [
  {
    id: "math-basic",
    subject: "Matematika",
    grade: "5-6 sinf",
    title: "Matematika: Kasrlar va Arifmetika (5-6 sinf)",
    badgeColor: "from-blue-500 to-cyan-600",
    icon: "Calculator",
    questions: [
      {
        id: 1,
        text: "Amalni bajaring: $\\frac{3}{4} + \\frac{1}{2} = ?$",
        answers: ["$\\frac{5}{4}$ (yoki $1\\frac{1}{4}$)", "$\\frac{4}{6}$", "$\\frac{1}{2}$", "$\\frac{3}{8}$"],
        correctIndex: 0,
      },
      {
        id: 2,
        text: "Sonning 20% i 40 ga teng bo'lsa, bu sonning o'zini toping?",
        answers: ["200", "160", "80", "250"],
        correctIndex: 0,
      },
      {
        id: 3,
        text: "Tenglamani yeching: $4x + 15 = 47$",
        answers: ["$x = 8$", "$x = 7$", "$x = 9$", "$x = 6$"],
        correctIndex: 0,
      },
      {
        id: 4,
        text: "To'g'ri to'rtburchakning bo'yi 12 sm, eni esa 7 sm. Uning perimetrini toping?",
        answers: ["$38\\text{ sm}$", "$84\\text{ sm}$", "$19\\text{ sm}$", "$42\\text{ sm}$"],
        correctIndex: 0,
      },
      {
        id: 5,
        text: "Kasrni qisqartiring: $\\frac{24}{36} = ?$",
        answers: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{6}$", "$\\frac{1}{2}$"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "algebra-middle",
    subject: "Algebra",
    grade: "7-8 sinf",
    title: "Algebra: Kvadrat tenglamalar va Formulalar (7-8 sinf)",
    badgeColor: "from-emerald-500 to-teal-600",
    icon: "Binary",
    questions: [
      {
        id: 1,
        text: "Kvadrat tenglamaning ildizlarini toping: $x^2 - 5x + 6 = 0$",
        answers: ["$x_1 = 2, \\ x_2 = 3$", "$x_1 = -2, \\ x_2 = -3$", "$x_1 = 1, \\ x_2 = 6$", "$x_1 = -1, \\ x_2 = 5$"],
        correctIndex: 0,
      },
      {
        id: 2,
        text: "Keltirilgan qisqa ko'paytirish formulasini oching: $(a + 3b)^2 = ?$",
        answers: ["$a^2 + 6ab + 9b^2$", "$a^2 + 3ab + 9b^2$", "$a^2 + 9b^2$", "$a^2 + 6ab + 3b^2$"],
        correctIndex: 0,
      },
      {
        id: 3,
        text: "Tenglamaning diskriminantini hisoblang: $2x^2 + 5x - 3 = 0$",
        answers: ["$D = 49$", "$D = 1$", "$D = 25$", "$D = 31$"],
        correctIndex: 0,
      },
      {
        id: 4,
        text: "Ifodani soddalashtiring: $(x - 4)(x + 4) + 16 = ?$",
        answers: ["$x^2$", "$x^2 - 32$", "$x^2 + 32$", "$x^2 - 8x$"],
        correctIndex: 0,
      },
      {
        id: 5,
        text: "Darajali ifodani hisoblang: $\\frac{2^7 \\cdot 2^3}{2^8} = ?$",
        answers: ["$4$", "$8$", "$2$", "$16$"],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "geometry-middle",
    subject: "Geometriya",
    grade: "7-9 sinf",
    title: "Geometriya: Uchburchaklar, Pifagor va Yuzalar (7-9 sinf)",
    badgeColor: "from-amber-500 to-orange-600",
    icon: "Triangle",
    questions: [
      {
        id: 1,
        text: "To'g'ri burchakli uchburchakning katetlari $a = 6\\text{ sm}$ va $b = 8\\text{ sm}$. Pifagor teoremasiga ko'ra gipotenuzani ($c$) toping?",
        answers: ["$c = 10\\text{ sm}$", "$c = 14\\text{ sm}$", "$c = 12\\text{ sm}$", "$c = 100\\text{ sm}$"],
        correctIndex: 0,
        diagram: {
          type: "right-triangle",
          labels: { a: "6", b: "8", c: "c=?" },
        },
      },
      {
        id: 2,
        text: "Uchburchakning ichki burchaklaridan ikkitasi $45^\\circ$ va $65^\\circ$ ga teng. Uchinchi burchakni toping?",
        answers: ["$70^\\circ$", "$80^\\circ$", "$90^\\circ$", "$60^\\circ$"],
        correctIndex: 0,
      },
      {
        id: 3,
        text: "Radiusi $r = 5\\text{ sm}$ bo'lgan aylananing yuzasini toping ($S = \\pi r^2$)?",
        answers: ["$25\\pi\\text{ sm}^2$", "$10\\pi\\text{ sm}^2$", "$50\\pi\\text{ sm}^2$", "$5\\pi\\text{ sm}^2$"],
        correctIndex: 0,
        diagram: {
          type: "circle",
          labels: { r: "r = 5" },
        },
      },
      {
        id: 4,
        text: "Asosi $a = 10\\text{ sm}$ va balandligi $h = 6\\text{ sm}$ bo'lgan uchburchakning yuzini ($S = \\frac{1}{2}ah$) hisoblang?",
        answers: ["$30\\text{ sm}^2$", "$60\\text{ sm}^2$", "$15\\text{ sm}^2$", "$45\\text{ sm}^2$"],
        correctIndex: 0,
        diagram: {
          type: "triangle",
          labels: { a: "b", b: "c", c: "10", h: true },
        },
      },
      {
        id: 5,
        text: "Asoslari $a = 4\\text{ sm}$, $b = 10\\text{ sm}$ va balandligi $h = 5\\text{ sm}$ bo'lgan trapetsiyaning yuzini toping?",
        answers: ["$35\\text{ sm}^2$", "$70\\text{ sm}^2$", "$28\\text{ sm}^2$", "$40\\text{ sm}^2$"],
        correctIndex: 0,
        diagram: {
          type: "trapezoid",
          labels: { a: "4", b: "10", h: true },
        },
      },
    ],
  },
  {
    id: "algebra-advanced",
    subject: "Algebra",
    grade: "10-11 sinf",
    title: "Algebra & DTM: Logarifm, Trigonometriya va Hosilalar",
    badgeColor: "from-purple-500 to-indigo-600",
    icon: "Sigma",
    questions: [
      {
        id: 1,
        text: "Logarifmik ifodani hisoblang: $\\log_2(32) + \\log_3(27) = ?$",
        answers: ["$8$", "$5$", "$9$", "$6$"],
        correctIndex: 0,
      },
      {
        id: 2,
        text: "Trigonometrik ayniyat qiymatini toping: $\\sin^2(35^\\circ) + \\cos^2(35^\\circ) + \\text{tg}(45^\\circ) = ?$",
        answers: ["$2$", "$1$", "$0$", "$\\sqrt{2}$"],
        correctIndex: 0,
      },
      {
        id: 3,
        text: "Funksiyaning hosilasini toping: $f(x) = 3x^3 - 5x^2 + 7x - 4$",
        answers: ["$f'(x) = 9x^2 - 10x + 7$", "$f'(x) = 9x^2 - 5x + 7$", "$f'(x) = 3x^2 - 10x + 7$", "$f'(x) = 9x^3 - 10x^2 + 7$"],
        correctIndex: 0,
      },
      {
        id: 4,
        text: "Arifmetik progressiyada $a_1 = 3$ va ayirma $d = 4$ bo'lsa, $a_{10}$ ni toping?",
        answers: ["$39$", "$43$", "$36$", "$40$"],
        correctIndex: 0,
      },
      {
        id: 5,
        text: "Tengsizlikni yeching: $|2x - 6| \\le 4$",
        answers: ["$[1; \\ 5]$", "$[2; \\ 6]$", "$[-1; \\ 5]$", "$[1; \\ 4]$"],
        correctIndex: 0,
      },
    ],
  },
];
