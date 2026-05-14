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
import { fetchWords } from './services/api.js';
import { surahOptions, posOptions } from './data/filterOptions';
import qamarLogo from './assets/qamar-logo.png';
import AboutQAMAR from './pages/AboutQAMAR.jsx';
import Contact from './pages/Contact.jsx';
import CorrectionForm from './pages/CorrectionForm.jsx';
import Documentation from './pages/Documentation.jsx';



function QLogo() {
  return (
    <div className="logo">
      <span className="logoMark">
        <img src={qamarLogo} alt="QAMAR logo" />
      </span>
      <strong>AMAR</strong>
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

          <button onClick={() => goTo('home')}>
            <Database /><span>QAMAR<small>قمر</small></span>
          </button>

          <button onClick={() => goTo('documentation')}>
            <BookOpen /><span>Documentation<small>التوثيق</small></span>
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
  if (totalPages <= 1) return [1];

  const pages = [];

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (previousPage >= 1) {
    pages.push(previousPage);
  }

  pages.push(currentPage);

  if (nextPage <= totalPages) {
    pages.push(nextPage);
  }

  return pages;
};

const getHeaderTitle = () => {
  switch (page) {
    case 'documentation':
      return 'Documentation';

    case 'about':
      return 'About QAMAR';

    case 'contact':
      return 'Contact';

    case 'correction':
      return 'Correction Form';

    default:
      return 'QAMAR';
  }
};

return (
  <div className="page">
<header>

  <button className="menu" onClick={() => setOpen(true)}>
    <Menu size={18} />Menu
  </button>

  <div className="headerCenter">

    {page === 'home' ? (
      <QLogo />
    ) : (
      <h1 className="dynamicHeaderTitle">
        {getHeaderTitle()}
      </h1>
    )}

  </div>

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

  <div className="heroWhiteSpace"></div>

  <div className="stats">
    <Stat icon={Database} num="77,881" label="TOTAL WORDS" ar="إجمالي الكلمات" />
    <Stat icon={BookOpen} num="114" label="SURAHS" ar="السور" />
    <Stat icon={Hash} num="1,661" label="UNIQUE ROOTS" ar="الجذور الفريدة" />
    <Stat icon={Layers} num="4,600" label="LEMMAS" ar="الفروع" />
  </div>

  <section className="searchWrap">
    <div className="searchBox">
      <Search />
      <input
        placeholder="Type your query | اكتب سؤالك"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <button>Search</button>
    </div>
  </section>

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
                    <td className="arabic">{r.pos2}</td>
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


          </>
        )}
      </main>
            <footer className="footer">
              <div className="footerOrn"><i></i><b></b><i></i></div>
              <h3>QAMAR — Quranic Arabic Morphological Analysis Resource</h3>
              <p>قمر — مدونة التحليل الصرفي للعربية القرآنية</p>
              <div className="footerOrn small"><i></i><b></b><i></i></div>
              <small>© 2026 QAMAR Research Project. All rights reserved.</small>
            </footer>
      <Drawer open={open} onClose={() => setOpen(false)} setPage={setPage} />
    </div>
  );
}
