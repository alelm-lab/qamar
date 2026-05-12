import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Database,
  Edit2,
  Filter,
  Hash,
  Info,
  Layers,
  Mail,
  Menu,
  Search,
  X
} from 'lucide-react';

import { useEffect, useRef, useState } from 'react';
import { fetchWords } from './services/api';

import AboutQAMAR from './pages/AboutQAMAR.jsx';
import Contact from './pages/Contact.jsx';
import CorrectionForm from './pages/CorrectionForm.jsx';
import Documentation from './pages/Documentation.jsx';

const surahOptions = [
  'All Surahs / كل السور',
  '1. Al-Fatiha / الفاتحة',
  '2. Al-Baqarah / البقرة',
  '3. Al-Imran / آل عمران',
  '4. An-Nisa / النساء',
  '5. Al-Ma’idah / المائدة',
  '6. Al-An’am / الأنعام',
  '7. Al-A’raf / الأعراف',
  '8. Al-Anfal / الأنفال',
  '9. At-Tawbah / التوبة',
  '10. Yunus / يونس',
  '11. Hud / هود',
  '12. Yusuf / يوسف',
  '13. Ar-Ra’d / الرعد',
  '14. Ibrahim / إبراهيم',
  '15. Al-Hijr / الحجر',
  '16. An-Nahl / النحل',
  '17. Al-Isra / الإسراء',
  '18. Al-Kahf / الكهف',
  '19. Maryam / مريم',
  '20. Ta-Ha / طه',
  '21. Al-Anbiya / الأنبياء',
  '22. Al-Hajj / الحج',
  '23. Al-Mu’minun / المؤمنون',
  '24. An-Nur / النور',
  '25. Al-Furqan / الفرقان',
  '26. Ash-Shu’ara / الشعراء',
  '27. An-Naml / النمل',
  '28. Al-Qasas / القصص',
  '29. Al-Ankabut / العنكبوت',
  '30. Ar-Rum / الروم',
  '31. Luqman / لقمان',
  '32. As-Sajdah / السجدة',
  '33. Al-Ahzab / الأحزاب',
  '34. Saba / سبأ',
  '35. Fatir / فاطر',
  '36. Ya-Sin / يس',
  '37. As-Saffat / الصافات',
  '38. Sad / ص',
  '39. Az-Zumar / الزمر',
  '40. Ghafir / غافر',
  '41. Fussilat / فصلت',
  '42. Ash-Shura / الشورى',
  '43. Az-Zukhruf / الزخرف',
  '44. Ad-Dukhan / الدخان',
  '45. Al-Jathiyah / الجاثية',
  '46. Al-Ahqaf / الأحقاف',
  '47. Muhammad / محمد',
  '48. Al-Fath / الفتح',
  '49. Al-Hujurat / الحجرات',
  '50. Qaf / ق',
  '51. Adh-Dhariyat / الذاريات',
  '52. At-Tur / الطور',
  '53. An-Najm / النجم',
  '54. Al-Qamar / القمر',
  '55. Ar-Rahman / الرحمن',
  '56. Al-Waqi’ah / الواقعة',
  '57. Al-Hadid / الحديد',
  '58. Al-Mujadilah / المجادلة',
  '59. Al-Hashr / الحشر',
  '60. Al-Mumtahanah / الممتحنة',
  '61. As-Saff / الصف',
  '62. Al-Jumu’ah / الجمعة',
  '63. Al-Munafiqun / المنافقون',
  '64. At-Taghabun / التغابن',
  '65. At-Talaq / الطلاق',
  '66. At-Tahrim / التحريم',
  '67. Al-Mulk / الملك',
  '68. Al-Qalam / القلم',
  '69. Al-Haqqah / الحاقة',
  '70. Al-Ma’arij / المعارج',
  '71. Nuh / نوح',
  '72. Al-Jinn / الجن',
  '73. Al-Muzzammil / المزمل',
  '74. Al-Muddaththir / المدثر',
  '75. Al-Qiyamah / القيامة',
  '76. Al-Insan / الإنسان',
  '77. Al-Mursalat / المرسلات',
  '78. An-Naba / النبأ',
  '79. An-Nazi’at / النازعات',
  '80. Abasa / عبس',
  '81. At-Takwir / التكوير',
  '82. Al-Infitar / الانفطار',
  '83. Al-Mutaffifin / المطففين',
  '84. Al-Inshiqaq / الانشقاق',
  '85. Al-Buruj / البروج',
  '86. At-Tariq / الطارق',
  '87. Al-A’la / الأعلى',
  '88. Al-Ghashiyah / الغاشية',
  '89. Al-Fajr / الفجر',
  '90. Al-Balad / البلد',
  '91. Ash-Shams / الشمس',
  '92. Al-Layl / الليل',
  '93. Ad-Duha / الضحى',
  '94. Ash-Sharh / الشرح',
  '95. At-Tin / التين',
  '96. Al-Alaq / العلق',
  '97. Al-Qadr / القدر',
  '98. Al-Bayyinah / البينة',
  '99. Az-Zalzalah / الزلزلة',
  '100. Al-Adiyat / العاديات',
  '101. Al-Qari’ah / القارعة',
  '102. At-Takathur / التكاثر',
  '103. Al-Asr / العصر',
  '104. Al-Humazah / الهمزة',
  '105. Al-Fil / الفيل',
  '106. Quraysh / قريش',
  '107. Al-Ma’un / الماعون',
  '108. Al-Kawthar / الكوثر',
  '109. Al-Kafirun / الكافرون',
  '110. An-Nasr / النصر',
  '111. Al-Masad / المسد',
  '112. Al-Ikhlas / الإخلاص',
  '113. Al-Falaq / الفلق',
  '114. An-Nas / الناس'
];

const posOptions = [
  'All POS / كل الأنواع',
  'Quranic Particle / حروف قرآنية',
  'Particle / حرف',
  'Nominal Verb / اسم فعل',
  'Verb / فعل',
  'Allah Name / اسم جلالة',
  'Attribute Name of Allah / اسم حسن',
  'Proper Noun / اسم علم',
  'Demonstrative Noun / اسم إشارة',
  'Relative Noun / اسم موصول',
  'Noun / اسم'
];

function QLogo({ large = false }) {
  return (
    <div className={large ? 'logo large' : 'logo'}>
      <span className="qmark">Q</span>
      <div>
        <strong>QAMAR</strong>
        <small>{large ? 'QURANIC ARABIC MORPHOLOGICAL ANALYSIS RESOURCE' : 'MORPHOLOGICAL ANALYSIS RESOURCE'}</small>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, num, label, ar }) {
  return (
    <div className="stat">
      <span><Icon size={18} /></span>
      <div>
        <b>{num}</b>
        <p>{label}</p>
        <small>{ar}</small>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, setPage }) {
  const goTo = (pageName) => {
    setPage(pageName);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={`shade ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <button className="close" onClick={onClose}><X size={20} /></button>
        <QLogo />

        <nav>
          <button onClick={() => goTo('documentation')}>
            <BookOpen /><span>Documentation<small>التوثيق</small></span>
          </button>

          <button onClick={() => goTo('home')}>
            <Database /><span>API Access<small>واجهة البرمجة</small></span>
          </button>

          <button onClick={() => goTo('about')}>
            <Info /><span>About QAMAR<small>حول قمر</small></span>
          </button>

          <button onClick={() => goTo('contact')}>
            <Mail /><span>Contact<small>اتصل بنا</small></span>
          </button>
        </nav>
      </aside>
    </>
  );
}

function arrayToWord(row) {
  return {
    number: row.id,
    surahAr: row.surah_name,
    surahEn: row.surah_name,
    uthmani: row.uthmani,
    msa: row.msa,
    stem: row.stem,
    lemma: row.lemma,
    root: row.root,
    pos1: row.pos1,
    pos2: row.pos2,
  };
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState('All Surahs / كل السور');
  const [selectedPos, setSelectedPos] = useState('All POS / كل الأنواع');
  const [selectedWord, setSelectedWord] = useState(null);
  const [toast, setToast] = useState(null);

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [rootQuery, setRootQuery] = useState('');
  const [lemmaQuery, setLemmaQuery] = useState('');

  const filtersRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

useEffect(() => {
  async function loadWords() {
    try {
      setLoading(true);

const cleanSurah =
  selectedSurah === 'All Surahs / كل السور'
    ? ''
    : `سورة ${selectedSurah.split('/')[1].trim()}`;

const cleanPos =
  selectedPos === 'All POS / كل الأنواع'
    ? ''
    : selectedPos.split('/')[1].trim();

const response = await fetchWords({
  page: currentPage,
  per_page: rowsPerPage,
  search: searchQuery,
  root: rootQuery,
  lemma: lemmaQuery,
  surah_name: cleanSurah,
  pos2: cleanPos,
});

      setRows(response.results || []);
      setTotalPages(response.total_pages || 1);
      setTotalResults(response.total_results || 0);
    } catch (error) {
      setToast({
        type: 'error',
        text: 'Could not load QAMAR data.',
        ar: 'تعذر تحميل بيانات قمر.'
      });
    } finally {
      setLoading(false);
    }
  }

  loadWords();
}, [
  currentPage,
  rowsPerPage,
  searchQuery,
  rootQuery,
  lemmaQuery,
  selectedSurah,
  selectedPos
]);

  const openCorrectionPage = (row) => {
    setSelectedWord(arrayToWord(row));
    setPage('correction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backHomeFromCorrection = (message) => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (message) {
      setToast(message);
      setTimeout(() => setToast(null), 4500);
    }
  };
const getPageNumbers = () => {
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) pages.push('left-dots');

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < totalPages - 2) pages.push('right-dots');

  pages.push(totalPages);

  return pages;
};

return (
  <div className="page">
      <header>
        <button className="menu" onClick={() => setOpen(true)}>
          <Menu size={18} />Menu
        </button>
        <QLogo />
      </header>

      <main>
        {toast && (
          <div className={`toastMessage ${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>
              {toast.text}
              <small>{toast.ar}</small>
            </span>
          </div>
        )}

            {page === 'correction' ? (
              <CorrectionForm selectedWord={selectedWord} onBackHome={backHomeFromCorrection} />
            ) : page === 'documentation' ? (
              <Documentation />
            ) : page === 'about' ? (
              <AboutQAMAR />
            ) : page === 'contact' ? (
              <Contact />
            ) : (
          <>
            <section className="hero">
              <QLogo large />

              <p className="subtitle">
                <span className="en">Advanced Quranic Arabic Search Platform</span>
                <span className="sep"></span>
                <span className="ar">منصة البحث المتقدم في العربية القرآنية</span>
              </p>

              <div className="orn"><i></i><b></b><i></i></div>

              <div className="stats">
                <Stat icon={Database} num="77,881" label="TOTAL WORDS" ar="إجمالي الكلمات" />
                <Stat icon={BookOpen} num="114" label="SURAHS" ar="السور" />
                <Stat icon={Hash} num="1,661" label="UNIQUE ROOTS" ar="الجذور الفريدة" />
                <Stat icon={Layers} num="4,600" label="LEMMAS" ar="الفروع" />
              </div>
            </section>

            <section className="searchWrap">
              <div className="searchBox">
                <Search />
                <input placeholder="Type your query | اكتب سؤالك" value={searchQuery}
                          onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                  }}
                />
                <button>Search</button>
              </div>
            </section>

            <section className="filters" ref={filtersRef}>
              <div className="filterTitle">
                <Filter size={18} className="filterIcon" />
                FILTERS <em>/ فلاتر</em>
              </div>

              <div className="filterRow">
                <div className="filterBox">
                  <button
                    className={activeFilter === 'surah' ? 'filterBtn active' : 'filterBtn'}
                    onClick={() => setActiveFilter(activeFilter === 'surah' ? null : 'surah')}
                  >
                    {selectedSurah} <ChevronDown size={17} />
                  </button>

                  {activeFilter === 'surah' && (
                    <div className="dropdownMenu surahMenu">
                      {surahOptions.map((surah) => (
                        <div
                          className="dropdownItem"
                          key={surah}
                          onClick={() => {
                            setSelectedSurah(surah);
                            setCurrentPage(1);
                            setActiveFilter(null);
                          }}
                        >
                          {surah}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="filterBox">
                  <button
                    className={activeFilter === 'pos' ? 'filterBtn active' : 'filterBtn'}
                    onClick={() => setActiveFilter(activeFilter === 'pos' ? null : 'pos')}
                  >
                    {selectedPos} <ChevronDown size={17} />
                  </button>

                  {activeFilter === 'pos' && (
                    <div className="dropdownMenu">
                      {posOptions.map((pos) => (
                        <div
                          className="dropdownItem"
                          key={pos}
                          onClick={() => {
                            setSelectedPos(pos);
                            setCurrentPage(1);
                            setActiveFilter(null);
                          }}
                        >
                          {pos}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  className="filterInput"
                  placeholder="Root / الجذر"
                  value={rootQuery}
                  onChange={(e) => {
                    setRootQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <input
                  className="filterInput"
                  placeholder="Lemma / الفرع"
                  value={lemmaQuery}
                  onChange={(e) => {
                    setLemmaQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </section>

            <section className="results">
              <div className="resTop">
            <p className="resultsCount">
              Showing
              <select
                className="inlineSelect"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              of <b>{totalResults}</b> results
              <em>/ عرض {rows.length} من أصل {totalResults} نتيجة</em>
            </p>

                <p className="live">
                  <span></span>
                  LIVE DATABASE
                </p>
              </div>

              <div className="pages pagesTop">
                <button
                  className={currentPage === 1 ? 'pageBtn disabled' : 'pageBtn'}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ‹ Previous
                </button>

                {getPageNumbers().map((pageNumber, index) =>
                  typeof pageNumber === 'string' ? (
                    <span key={index} className="pageDots">...</span>
                  ) : (
                    <button
                      key={pageNumber}
                      className={currentPage === pageNumber ? 'pageBtn active' : 'pageBtn'}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  className={currentPage === totalPages ? 'pageBtn disabled' : 'pageBtn'}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next ›
                </button>
              </div>

              <div className="tableCard">
                <table>
                  <thead>
                    <tr>
                      {[
                        ['N°', 'الرقم', 'The line number\nرقم السطر'],
                        ['SURAH NAME', 'اسم السورة', 'The name of the Surah in the Quran\nاسم السورة في القرآن'],
                        ['UTHMANI', 'الرسم العثماني', 'The Uthmani script representation of the word\nتمثيل الكلمة بالرسم العثماني'],
                        ['MSA', 'العربية الفصحى المعاصرة', 'The Modern Standard Arabic (MSA) form of the word\nصيغة الكلمة بالعربية الفصحى الحديثة'],
                        ['STEM', 'جذع', 'The stem form of the word, without enclitics and proclitics\nصيغة جذع الكلمة بدون سوابق أو لواحق نحوية'],
                        ['LEMMA', 'فرع', 'The lemma (dictionary form) of the word, without suffixes and prefixes\nصيغة فرع الكلمة (دخلة معجمية)، بدون سوابق أو لواحق صرفية'],
                        ['ROOT', 'جذر', 'The root of the word in Arabic morphology\nجذر الكلمة في علم الصرف للغة العربية'],
                        ['POS LVL 1', 'أجزاء الكلام المستوى الأول', 'The first level part-of-speech (POS) classification of the lemma of the word: Noun, Verb and Particle\nالتصنيف النحوي للمستوى الأول لجذر الكلمة: اسم، فعل، وحرف'],
                        ['POS LVL 2', 'أجزاء الكلام المستوى الثاني', `The second level part-of-speech (POS) classification. The following tag specifications are used: for particles (Quranic particles and Particle), for verb (Nominal Verb and Verb) and for Noun (Allahs name, Attribute Name of Allah, Proper Noun, Demonstrative Noun, Relative Noun, and Noun).

التصنيف الصرفي على المستوى الثاني يتم استخدام التوسيمات التالية:
- للحروف: حروف قرآنية وحرف.
- للأفعال: اسم فعل وفعل.
- للأسماء: اسم جلالة، اسم حسن، اسم علم، اسم إشارة، اسم موصول، واسم.`],
                        ['CORRECTION', 'التصحيح', 'This form allows the user to provide correction suggestions for the morphological feature values of a Quranic word when identifying an incorrect value.\nيتيح هذا النموذج للمستخدم تقديم اقتراحات تصحيح لقيم الخصائص الصرفية لكلمة قرآنية عند اكتشاف قيمة غير صحيحة.']
                      ].map(([en, ar, tip]) => (
                        <th key={en} className="tooltip" data-tooltip={tip}>
                          {en} <Info size={13} />
                          <small>{ar}</small>
                        </th>
                      ))}
                    </tr>
                  </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="10">Loading QAMAR data...</td>
                  </tr>
                )}

                {!loading && rows.length === 0 && (
                  <tr>
                    <td colSpan="10">No results found.</td>
                  </tr>
                )}

                {!loading && rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td className="surah"><b>{r.surah_name}</b></td>
                    <td className="arabic">{r.uthmani}</td>
                    <td className="arabic">{r.msa}</td>
                    <td className="arabic orange">{r.stem}</td>
                    <td className="arabic">{r.lemma}</td>
                    <td><span className="root">{r.root}</span></td>
                    <td><span className="tag">{r.pos1}</span></td>
                    <td>{r.pos2}</td>
                    <td>
                      <button className="edit" onClick={() => openCorrectionPage(r)}>
                        <Edit2 size={16} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
                </table>
              </div>

              <div className="pages pagesBottom">
                <button
                  className={currentPage === 1 ? 'pageBtn disabled' : 'pageBtn'}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ‹ Previous
                </button>

                {getPageNumbers().map((pageNumber, index) =>
                  typeof pageNumber === 'string' ? (
                    <span key={index} className="pageDots">...</span>
                  ) : (
                    <button
                      key={pageNumber}
                      className={currentPage === pageNumber ? 'pageBtn active' : 'pageBtn'}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  className={currentPage === totalPages ? 'pageBtn disabled' : 'pageBtn'}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next ›
                </button>
              </div>
            </section>

            <footer className="footer">
              <div className="footerOrn"><i></i><b></b><i></i></div>
              <h3>QAMAR — Quranic Arabic Morphological Analysis Resource</h3>
              <p>قمر — مدونة التحليل الصرفي للعربية القرآنية</p>
              <div className="footerOrn small"><i></i><b></b><i></i></div>
              <small>© 2026 QAMAR Research Project. All rights reserved.</small>
            </footer>
          </>
        )}
      </main>

      <Drawer open={open} onClose={() => setOpen(false)} setPage={setPage} />
    </div>
  );
}
