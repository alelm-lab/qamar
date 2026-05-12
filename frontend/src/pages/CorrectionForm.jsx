import { Hash } from 'lucide-react';
import { useState } from 'react';
import { saveSuggestion } from '../services/api';

export default function CorrectionForm({ selectedWord, onBackHome }) {
  const [suggestions, setSuggestions] = useState({
    msa: '',
    stem: '',
    lemma: '',
    root: '',
    pos1: '',
    pos2: ''
  });

  const handleChange = (field, value) => {
    setSuggestions((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const hasSuggestion = Object.values(suggestions).some(
    (value) => value.trim() !== ''
  );

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!hasSuggestion) {
    onBackHome({
      type: 'error',
      text: 'Please provide at least one suggestion',
      ar: 'يرجى تقديم اقتراح واحد على الأقل'
    });
    return;
  }

  try {
    const response = await saveSuggestion({
      line_number: selectedWord?.number,
      ...suggestions
    });

    onBackHome({
      type: response.status,
      text: response.message,
      ar: response.ar
    });
  } catch (error) {
    onBackHome({
      type: 'error',
      text: error.message || 'An error occurred while saving the suggestion.',
      ar: error.ar || 'حدث خطأ أثناء حفظ الاقتراح.'
    });
  }
};

  return (
    <section className="correctionPage">
      <div className="correctionHeader">
        <h1>Word Correction</h1>

        <div className="correctionMeta">
          <p>
            Surah:
            <span>{selectedWord?.surahAr || 'الفاتحة'}</span>
          </p>

          <p>
            <Hash size={16} />
            Line:
            <span>{selectedWord?.number || '1'}</span>
          </p>
        </div>
      </div>

      <form className="correctionCard" onSubmit={handleSubmit}>
        <div className="correctionTableHeader">
          <div>Feature</div>
          <div>Current Value</div>
          <div>Suggested Correction</div>
        </div>

        <CorrectionRow
          label="Uthmani"
          original={selectedWord?.uthmani || 'ٱللَّهُ'}
          suggestion={selectedWord?.uthmani || 'ٱللَّهُ'}
          disabled
        />

        <CorrectionRow
          label="MSA"
          original={selectedWord?.msa || 'اللهُ'}
          placeholder="Enter suggestion here"
          value={suggestions.msa}
          onChange={(value) => handleChange('msa', value)}
        />

        <CorrectionRow
          label="Stem"
          original={selectedWord?.stem || 'الله'}
          placeholder="Enter suggestion here"
          value={suggestions.stem}
          onChange={(value) => handleChange('stem', value)}
        />

        <CorrectionRow
          label="Lemma"
          original={selectedWord?.lemma || 'الله'}
          placeholder="Enter suggestion here"
          value={suggestions.lemma}
          onChange={(value) => handleChange('lemma', value)}
        />

        <CorrectionRow
          label="Root"
          original={selectedWord?.root || 'أ ل ه'}
          placeholder="Enter suggestion here"
          value={suggestions.root}
          onChange={(value) => handleChange('root', value)}
        />

        <CorrectionRow
          label="POS Level 1"
          original={selectedWord?.pos1 || 'Noun'}
          placeholder="Enter suggestion here"
          value={suggestions.pos1}
          onChange={(value) => handleChange('pos1', value)}
        />

        <CorrectionRow
          label="POS Level 2"
          original={selectedWord?.pos2 || 'Proper Noun'}
          placeholder="Enter suggestion here"
          value={suggestions.pos2}
          onChange={(value) => handleChange('pos2', value)}
        />

        <div className="correctionActions">
          <button type="submit" className="submitCorrection">
            Submit
          </button>

          <button
            type="button"
            className="cancelCorrection"
            onClick={() => onBackHome(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

function CorrectionRow({
  label,
  original,
  suggestion,
  placeholder,
  value,
  onChange,
  disabled
}) {
  return (
    <div className="correctionRow">
      <label>{label}</label>

      <input
        className="originalInput"
        value={original}
        readOnly
      />

      <input
        className="suggestionInput"
        value={disabled ? suggestion : value}
        readOnly={disabled}
        placeholder={disabled ? '' : placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}