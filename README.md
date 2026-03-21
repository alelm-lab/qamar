# **QAMAR: Quranic Arabic Morphological Analysis Resource**

## 📖 Overview

**QAMAR (Quranic Arabic Morphological Analysis Resource)** is a comprehensive, fully verified linguistic resource designed to support **Quranic Arabic analysis** and **Arabic Natural Language Processing (NLP)** applications.

Unlike many existing Quranic corpora that suffer from incomplete coverage or limited validation, QAMAR provides a **high-quality, manually verified morphological layer** for every Quranic word, enabling reliable research and benchmarking.
 
## 🎯 Key Features

* **Full Coverage of the Qur’an**

  * Includes all Quranic words with consistent annotation.

* **Rich Morphological Annotation**
  Each word is annotated with:

  * Modern Standard Arabic equivalent (**MSA**)
  * **Stem**
  * **Lemma**
  * **Root**
  * **Part of Speech (POS)**

* **Manual Verification**

  * Multi-stage validation by linguistic experts ensures **high accuracy and consistency**.
  * Manual verification period: **1 year and 10 months**.
  * Sequential validation process: **3 iterative review phases**.

* **Multi-task Support**
  QAMAR enables:

  * Text normalization
  * Lemmatization
  * Root extraction
  * POS tagging

* **Benchmarking Resource**

  * Serves as a **gold-standard reference** for:

    * Quranic NLP
    * Morphological analysis evaluation
    * LLM hallucination analysis
 
## 🏗️ Resource Construction

QAMAR is built through a **semi-automatic pipeline**:

1. **Data Collection**

   * Quranic text (Uthmani script) obtained from reliable sources.
   * Conversion to MSA-compatible forms.

2. **Automatic Annotation**

   * Initial annotations generated using **SAFAR tools**:

     * Normalization
     * Lemmatization
     * Root extraction
     * POS tagging

3. **Manual Verification**

   * Iterative validation by expert linguists
   * Multiple review cycles to ensure consistency and correctness

4. **Annotation Schema Design**

   * Standardized representation for both:

     * Human readability
     * Computational processing
 
## 🧩 Annotation Schema

Each Quranic word is represented using the following linguistic layers:

| Feature     | Description                           |
| ----------- | ------------------------------------- |
| **Uthmani** | Original Quranic script               |
| **MSA**     | Modern Standard Arabic equivalent     |
| **Stem**    | Core word form without clitics        |
| **Lemma**   | Base dictionary form                  |
| **Root**    | Triliteral/quadriliteral root         |
| **POS**     | Part of Speech (Noun, Verb, Particle) |
 
## 🧠 Linguistic Design Principles

* **Context-aware annotation** (especially for POS)
* **Diacritic-sensitive representation**
* **Clear separation between stem and lemma**
* **Explicit handling of particles and non-root words**
 
## 📊 Use Cases

QAMAR is designed for a wide range of applications:

* 📚 Quranic linguistic analysis
* 🤖 Arabic NLP research
* 🧪 Morphological analyzer evaluation
* 🔍 Corpus-to-corpus comparison
* 🧠 LLM evaluation and hallucination analysis
* 🔤 Lexical and semantic studies
 
## 🧾 Data Format

The resource is also available in **TEI-XML format**, enabling structured linguistic representation.

Example structure:

```xml
<div type="surah" n="1">
<head>سورة الفاتحة</head>
<div type="aya" n="1">
<phr type="ayaText">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</phr>
<w value="بِسْمِ" type="Uthmani">
<seg value="بِاسْمِ" type="msa">
<fs type="linguistic">
<f name="stem">اسْم</f>
<f name="lemma">اسْم</f>
<f name="root">سمو</f>
<f name="pos">اسم</f>
<f name="altPos">اسم</f>
</fs>
</seg>
</w>
...
</div>

This format ensures:

* Interoperability
* Reusability
* Compatibility with digital humanities tools


## 📈 Comparison with Existing Resources

QAMAR is designed to complement and improve upon existing Quranic corpora by providing:

* Higher **annotation consistency**
* Full **manual verification**
* Unified **multi-feature representation**
* Compatibility with modern NLP pipelines


## 📌 Citation

If you use QAMAR in your research, please cite:

```bibtex
@inproceedings{qamar2026,
  title={QAMAR: A Fully Verified Quranic Arabic Morphological Analysis Resource},
  author={Faqihi, Sara and Bouzoubaa, Karim and Tajmout, Rachida and Namly, Driss},
  booktitle={Proceedings of the AbjadNLP Workshop at EACL 2026},
  year={2026}
}
```
 

## 🤝 Contributions

Contributions are welcome. Possible directions:

* Annotation refinement
* Additional linguistic layers
* Integration with NLP pipelines
* Evaluation benchmarks
 

## 📬 Contact

For questions, collaboration, or access requests:

**Sara Faqihi**
PhD Candidate – Arabic NLP
Mohammed V University, Morocco
 

## ⭐ Acknowledgment

This resource builds upon prior work in Quranic and Arabic morphology and leverages **SAFAR tools** for initial annotation, followed by extensive expert validation.
