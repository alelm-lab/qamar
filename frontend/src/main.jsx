import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
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
    <CorrectionForm
      selectedWord={selectedWord}
      onBackHome={backHomeFromCorrection}
    />
  ) : page === 'documentation' ? (
    <Documentation />
  ) : page === 'api' ? (
    <APIAccess />
  ) : page === 'about' ? (
    <AboutQAMAR />
  ) : page === 'contact' ? (
    <Contact />
  ) : (
    <>
      {/* your current home page content */}
    </>
  )}
</main>