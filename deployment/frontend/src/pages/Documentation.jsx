import {
    BookOpen,
    Brain,
    Database,
    ExternalLink,
    FileText,
    GitBranch,
    Layers,
    ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

function FlipCard({ icon: Icon, titleEn, textEn, titleAr, textAr }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article className={`flipCard ${flipped ? 'flipped' : ''}`}>
      <div className="flipCardInner">

        <div className="flipFace flipFront">
          <button
            type="button"
            className="langToggle"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(true);
            }}
          >
            ع
          </button>

          <Icon />
          <h3>{titleEn}</h3>
          <p>{textEn}</p>
        </div>

        <div className="flipFace flipBack" dir="rtl">
          <button
            type="button"
            className="langToggle"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
          >
            En
          </button>

          <Icon />
          <h3>{titleAr}</h3>
          <p>{textAr}</p>
        </div>

      </div>
    </article>
  );
}

export default function Documentation() {
  return (
    <section className="infoPage">
<div className="infoSection infoHeroSection docHeroAcademic">
  <div className="infoHero">

    <div className="heroDivider"></div>

    <div className="docLinks">
      <a
        href="https://aclanthology.org/2026.abjadnlp-1.38/"
        target="_blank"
        rel="noreferrer"
      >
        <FileText size={16}/>
        Papers
      </a>

      <a
        href="https://github.com/alelm-lab/qamar/"
        target="_blank"
        rel="noreferrer"
      >
        <GitBranch size={16}/>
        GitHub
      </a>
    </div>

  </div>
</div>

      <div className="infoSection infoSoftSection sectionDecorated">
        <div className="infoSectionInner schemaSection">
          <h2>Annotation Schema</h2>

          <table className="schemaTable">
            <tbody>
              <tr><th>Uthmani</th><td>Original Quranic text in Uthmani script</td></tr>
              <tr><th>MSA</th><td>Modern Standard Arabic equivalent</td></tr>
              <tr><th>Stem</th><td>Core word form after removing clitics</td></tr>
              <tr><th>Lemma</th><td>Base dictionary form</td></tr>
              <tr><th>Root</th><td>Triliteral or quadriliteral root</td></tr>
              <tr><th>POS1</th><td>Tripartite classification: Noun, Verb, Particle</td></tr>
              <tr><th>POS2</th><td>Fine-grained POS with 10 Quran-specific categories</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="infoSection infoWhiteSection">
        <div className="infoSectionInner docSection">
          <h2>Linguistic Design Principles</h2>

          <div className="principleGrid">
            <FlipCard
              icon={BookOpen}
              titleEn="Context-aware Annotation"
              textEn="Annotations are assigned according to the Quranic context of each word."
              titleAr="وسم مراعي للسياق"
              textAr="تُحدَّد الوسوم وفق السياق القرآني الخاص بكل كلمة."
            />

            <FlipCard
              icon={Layers}
              titleEn="Diacritic-sensitive Representation"
              textEn="The resource preserves meaningful diacritic distinctions in Quranic Arabic."
              titleAr="تمثيل حساس للتشكيل"
              textAr="يحافظ المورد على الفروق الدلالية والصرفية المرتبطة بالتشكيل في العربية القرآنية."
            />

            <FlipCard
              icon={Database}
              titleEn="Stem/Lemma Separation"
              textEn="The schema clearly separates the stem form from the dictionary lemma."
              titleAr="فصل الجذع عن الفرع"
              textAr="يميز المخطط بوضوح بين صيغة الجذع وصيغة الفرع المعجمية."
            />

            <FlipCard
              icon={ShieldCheck}
              titleEn="Particles and Non-root Words"
              textEn="Particles and non-root words are handled explicitly in the annotation schema."
              titleAr="معالجة الحروف والكلمات غير الجذرية"
              textAr="يعالج المخطط الحروف والكلمات غير الجذرية بشكل صريح ومنظم."
            />
          </div>
        </div>
      </div>
    </section>
  );
}