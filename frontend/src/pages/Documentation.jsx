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
            Ar
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
      <div className="infoSection infoHeroSection">
        <div className="infoHero">
          <h1>QAMAR Resource Documentation</h1>
          <h1>
            About QAMAR <span className="arabicTitle">| توثيق مدونة قمر</span>
          </h1>

          <p>
            QAMAR is a comprehensive, fully verified Quranic Arabic Morphological Analysis
            Resource designed to support Quranic Arabic analysis and Arabic NLP applications.
          </p>

          <div className="docLinks">
            <a href="https://aclanthology.org/2026.abjadnlp-1.38/" target="_blank" rel="noreferrer">
              Paper <ExternalLink size={15}/>
            </a>
            <a href="https://github.com/alelm-lab/qamar/" target="_blank" rel="noreferrer">
              GitHub Resource <ExternalLink size={15}/>
            </a>
          </div>
        </div>
      </div>

      <div className="softWaveTop"></div>

      <div className="infoSection infoFeatureSection sectionDecorated">
        <div className="infoSectionInner">
          <div className="infoGrid">
            <FlipCard
              icon={BookOpen}
              titleEn="Full Quran Coverage"
              textEn="Includes all Quranic words, more than 78k tokens, with consistent annotation."
              titleAr="تغطية كاملة للقرآن"
              textAr="يشمل جميع كلمات القرآن الكريم، بما يزيد عن 78 ألف وحدة نصية، مع وسم صرفي متسق."
            />

            <FlipCard
              icon={Layers}
              titleEn="Rich Morphological Annotation"
              textEn="Each word is annotated with MSA equivalent, stem, lemma, root, and POS."
              titleAr="وسم صرفي غني"
              textAr="تُوسَم كل كلمة بما يقابلها في العربية الفصحى المعاصرة، والجذع، والفرع، والجذر، وأجزاء الكلام."
            />

            <FlipCard
              icon={ShieldCheck}
              titleEn="Manual Verification"
              textEn={
                <>
                  Validated by linguistic experts over{' '}
                  <span className="highlightDuration">1 year and 10 months</span>{' '}
                  through 3 review phases.
                </>
              }
              titleAr="تحقق يدوي"
              textAr="تم التحقق من المورد من طرف خبراء لغويين على مدى سنة و10 أشهر عبر 3 مراحل مراجعة."
            />

            <FlipCard
              icon={Brain}
              titleEn="Benchmarking Resource"
              textEn="Useful for Quranic NLP, morphological analysis evaluation, and LLM hallucination analysis."
              titleAr="مورد مرجعي للتقييم"
              textAr="يفيد في معالجة القرآن آلياً، وتقييم التحليل الصرفي، وتحليل هلوسة النماذج اللغوية الكبيرة."
            />
          </div>
        </div>
      </div>

      <div className="softWaveBottom"></div>

      <div className="infoSection infoWhiteSection">
        <div className="infoSectionInner docSection">
          <h2>Resource Construction</h2>

          <div className="timelineGrid">
            <FlipCard
              icon={GitBranch}
              titleEn="1. Data Collection"
              textEn="Quranic text in Uthmani script was obtained from Tanzil and converted to MSA-compatible forms."
              titleAr="1. جمع البيانات"
              textAr="تم الحصول على النص القرآني بالرسم العثماني من موقع تنزيل، ثم تحويله إلى صيغ متوافقة مع العربية الفصحى المعاصرة."
            />

            <FlipCard
              icon={Database}
              titleEn="2. Automatic Annotation"
              textEn="Initial annotations were generated using SAFAR tools for normalization, lemmatization, root extraction, and POS tagging."
              titleAr="2. الوسم الآلي"
              textAr="تم توليد الوسوم الأولية باستخدام أدوات SAFAR للتطبيع، واستخراج الفروع، والجذور، ووسم أجزاء الكلام."
            />

            <FlipCard
              icon={ShieldCheck}
              titleEn="3. Manual Verification"
              textEn="Expert linguists performed iterative validation through multiple review cycles."
              titleAr="3. التحقق اليدوي"
              textAr="قام خبراء لغويون بمراجعة الوسوم والتحقق منها عبر دورات مراجعة متعددة لضمان الدقة والاتساق."
            />

            <FlipCard
              icon={FileText}
              titleEn="4. Schema Design"
              textEn="The schema was standardized for both human readability and computational processing."
              titleAr="4. تصميم المخطط"
              textAr="تم توحيد مخطط الوسم ليكون مناسباً للقراءة البشرية والمعالجة الحاسوبية في الوقت نفسه."
            />
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