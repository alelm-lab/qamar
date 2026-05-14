import { Award, BookOpen, Brain, Database, ShieldCheck } from 'lucide-react';
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

function LangPanel({ icon: Icon, titleEn, textEn, titleAr, textAr, childrenEn, childrenAr }) {
  const [lang, setLang] = useState('en');

  const isArabic = lang === 'ar';

  return (
    <div className="langPanel" dir={isArabic ? 'rtl' : 'ltr'}>
      <button
        type="button"
        className="panelLangToggle"
        onClick={() => setLang(isArabic ? 'en' : 'ar')}
      >
        {isArabic ? 'En' : 'ع'}
      </button>

      <Icon />

      <div>
        <h2>{isArabic ? titleAr : titleEn}</h2>
        <p>{isArabic ? textAr : textEn}</p>

        {isArabic ? childrenAr : childrenEn}
      </div>
    </div>
  );
}

export default function AboutQAMAR() {
  return (
    <section className="infoPage">
      <div className="infoSection infoHeroSection">
        <div className="infoHero">

          {/* REMOVED eyebrow */}

          <h1>
            About QAMAR <span className="arabicTitle">| حول قمر</span>
          </h1>

          <p>
            QAMAR is a Quranic Arabic Morphological Analysis Resource developed to provide
            a reliable, manually verified linguistic layer for every Quranic word.
          </p>
        </div>
      </div>

      <div className="infoSection infoWhiteSection">
        <div className="infoSectionInner">
<LangPanel
  icon={BookOpen}
  titleEn="Overview"
  titleAr="نظرة عامة"
  textEn="Unlike many existing Quranic corpora that suffer from incomplete coverage or limited validation, QAMAR provides a comprehensive high-quality, manually verified morphological layer supporting reliable research, benchmarking, and Arabic NLP."
  textAr="على خلاف العديد من المدونات القرآنية الحالية التي تعاني من محدودية التغطية أو ضعف التحقق، يوفر مشروع قمر طبقة صرفية عالية الجودة تم التحقق منها يدويًا لدعم البحث العلمي والتقييم وتطبيقات المعالجة الآلية للغة العربية."
/>

<div className="infoGrid">

  <FlipCard
    icon={Database}
    titleEn="Comprehensive Resource"
    textEn="QAMAR covers all Quranic words and provides structured linguistic features."
    titleAr="مورد لغوي شامل"
    textAr="يغطي مشروع قمر جميع كلمات القرآن الكريم ويوفر طبقات لغوية منظمة ودقيقة."
  />

  <FlipCard
    icon={ShieldCheck}
    titleEn="Expert Validation"
    textEn="The resource was reviewed through multi-stage linguistic validation."
    titleAr="تحقق لغوي متخصص"
    textAr="خضع المورد لمراحل متعددة من التحقق والمراجعة اللغوية المتخصصة."
  />

  <FlipCard
    icon={Brain}
    titleEn="NLP-Oriented Design"
    textEn="Designed for normalization, lemmatization, root extraction, POS tagging, and evaluation."
    titleAr="تصميم موجّه للمعالجة الآلية"
    textAr="صُمم المورد لدعم التطبيع، واستخراج الجذور، والتأصيل، وتوسيم أجزاء الكلام، والتقييم."
  />

  <FlipCard
    icon={Award}
    titleEn="Gold-Standard Benchmark"
    textEn="Supports evaluation of morphological analyzers and LLM outputs for Quranic Arabic."
    titleAr="مرجع معياري ذهبي"
    textAr="يدعم تقييم المحللات الصرفية ومخرجات النماذج اللغوية الكبيرة الخاصة بالعربية القرآنية."
  />

</div>
        </div>
      </div>

<div className="infoSection infoSoftSection sectionDecorated">
  <div className="infoSectionInner docSection">

    <h2>Use Cases</h2>

    <div className="infoGrid">

      <FlipCard
        icon={BookOpen}
        titleEn="Quranic Linguistic Analysis"
        textEn="Supports detailed linguistic and morphological analysis of Quranic Arabic."
        titleAr="التحليل اللغوي للقرآن"
        textAr="يدعم التحليل اللغوي والصرفي التفصيلي للعربية القرآنية."
      />

      <FlipCard
        icon={Brain}
        titleEn="Arabic NLP Research"
        textEn="Useful for Arabic Natural Language Processing research and experimentation."
        titleAr="أبحاث المعالجة الآلية"
        textAr="مفيد لأبحاث وتجارب المعالجة الآلية للغة العربية."
      />

      <FlipCard
        icon={ShieldCheck}
        titleEn="Morphological Evaluation"
        textEn="Enables evaluation and benchmarking of morphological analyzers."
        titleAr="تقييم المحللات الصرفية"
        textAr="يتيح تقييم ومقارنة أداء المحللات الصرفية."
      />

      <FlipCard
        icon={Database}
        titleEn="Corpus Comparison"
        textEn="Facilitates corpus-to-corpus comparison and linguistic validation."
        titleAr="مقارنة المدونات"
        textAr="يسهل المقارنة بين المدونات اللغوية والتحقق من الاتساق اللغوي."
      />

      <FlipCard
        icon={Brain}
        titleEn="LLM Evaluation"
        textEn="Supports hallucination analysis and evaluation of large language models."
        titleAr="تقييم النماذج اللغوية"
        textAr="يدعم تحليل الهلوسة وتقييم النماذج اللغوية الكبيرة."
      />

      <FlipCard
        icon={Award}
        titleEn="Lexical & Semantic Studies"
        textEn="Can be used in lexical, semantic, and Quranic linguistic studies."
        titleAr="الدراسات المعجمية والدلالية"
        textAr="يمكن استخدامه في الدراسات المعجمية والدلالية واللغوية القرآنية."
      />

    </div>

  </div>
</div>


<div className="infoSection infoWhiteSection">
  <div className="infoSectionInner">
    <LangPanel
      icon={ShieldCheck}
      titleEn="Acknowledgment"
      titleAr="شكر وتقدير"
      textEn="This resource builds upon prior work in Quranic and Arabic morphology and leverages SAFAR Tools for initial annotation, followed by extensive expert validation."
      textAr="يعتمد هذا المورد على أعمال سابقة في الصرف العربي والقرآني، ويستفيد من أدوات سفار لإجراء التوسيم الأولي، ثم يخضع لمراحل موسعة من التحقق اللغوي اليدوي."
    />
  </div>
</div>

    </section>
  );
}