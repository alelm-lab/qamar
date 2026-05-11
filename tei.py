import pandas as pd
from lxml import etree

INPUT_FILE = r"C:\Users\admin\OneDrive - um5.ac.ma\Desktop\QAMAR.xlsx"
SHEET_NAME = "QAMAR"
OUTPUT_FILE = r"C:\Users\admin\OneDrive - um5.ac.ma\Desktop\QAMAR_Files\QAMAR_TEI.xml"

surah_names = {
    1: "سورة الفاتحة",
    2: "سورة البقرة",
    3: "سورة آل عمران",
    4: "سورة النساء",
    5: "سورة المائدة",
    6: "سورة الأنعام",
    7: "سورة الأعراف",
    8: "سورة الأنفال",
    9: "سورة التوبة",
    10: "سورة يونس",
    11: "سورة هود",
    12: "سورة يوسف",
    13: "سورة الرعد",
    14: "سورة إبراهيم",
    15: "سورة الحجر",
    16: "سورة النحل",
    17: "سورة الإسراء",
    18: "سورة الكهف",
    19: "سورة مريم",
    20: "سورة طه",
    21: "سورة الأنبياء",
    22: "سورة الحج",
    23: "سورة المؤمنون",
    24: "سورة النور",
    25: "سورة الفرقان",
    26: "سورة الشعراء",
    27: "سورة النمل",
    28: "سورة القصص",
    29: "سورة العنكبوت",
    30: "سورة الروم",
    31: "سورة لقمان",
    32: "سورة السجدة",
    33: "سورة الأحزاب",
    34: "سورة سبأ",
    35: "سورة فاطر",
    36: "سورة يس",
    37: "سورة الصافات",
    38: "سورة ص",
    39: "سورة الزمر",
    40: "سورة غافر",
    41: "سورة فصلت",
    42: "سورة الشورى",
    43: "سورة الزخرف",
    44: "سورة الدخان",
    45: "سورة الجاثية",
    46: "سورة الأحقاف",
    47: "سورة محمد",
    48: "سورة الفتح",
    49: "سورة الحجرات",
    50: "سورة ق",
    51: "سورة الذاريات",
    52: "سورة الطور",
    53: "سورة النجم",
    54: "سورة القمر",
    55: "سورة الرحمن",
    56: "سورة الواقعة",
    57: "سورة الحديد",
    58: "سورة المجادلة",
    59: "سورة الحشر",
    60: "سورة الممتحنة",
    61: "سورة الصف",
    62: "سورة الجمعة",
    63: "سورة المنافقون",
    64: "سورة التغابن",
    65: "سورة الطلاق",
    66: "سورة التحريم",
    67: "سورة الملك",
    68: "سورة القلم",
    69: "سورة الحاقة",
    70: "سورة المعارج",
    71: "سورة نوح",
    72: "سورة الجن",
    73: "سورة المزمل",
    74: "سورة المدثر",
    75: "سورة القيامة",
    76: "سورة الإنسان",
    77: "سورة المرسلات",
    78: "سورة النبأ",
    79: "سورة النازعات",
    80: "سورة عبس",
    81: "سورة التكوير",
    82: "سورة الانفطار",
    83: "سورة المطففين",
    84: "سورة الانشقاق",
    85: "سورة البروج",
    86: "سورة الطارق",
    87: "سورة الأعلى",
    88: "سورة الغاشية",
    89: "سورة الفجر",
    90: "سورة البلد",
    91: "سورة الشمس",
    92: "سورة الليل",
    93: "سورة الضحى",
    94: "سورة الشرح",
    95: "سورة التين",
    96: "سورة العلق",
    97: "سورة القدر",
    98: "سورة البينة",
    99: "سورة الزلزلة",
    100: "سورة العاديات",
    101: "سورة القارعة",
    102: "سورة التكاثر",
    103: "سورة العصر",
    104: "سورة الهمزة",
    105: "سورة الفيل",
    106: "سورة قريش",
    107: "سورة الماعون",
    108: "سورة الكوثر",
    109: "سورة الكافرون",
    110: "سورة النصر",
    111: "سورة المسد",
    112: "سورة الإخلاص",
    113: "سورة الفلق",
    114: "سورة الناس"
}

df = pd.read_excel(INPUT_FILE, sheet_name=SHEET_NAME, dtype=str)

df.columns = df.columns.str.strip()

required_cols = [
    "Surah", "Aya", "Uthmani", "word", "stem",
    "lemma", "root", "pos_1", "pos_2"
]

for col in required_cols:
    if col not in df.columns:
        raise ValueError(f"Missing column: {col}")

df = df[required_cols].fillna("")

# Remove extra spaces from all text cells
for col in required_cols:
    df[col] = df[col].astype(str).str.strip()

df["Surah"] = df["Surah"].astype(int)
df["Aya"] = df["Aya"].astype(int)

# IMPORTANT:
# If Uthmani is empty, it means the current MSA segment belongs
# to the previous Uthmani word.
# Example:
# يَـٰٓأَيُّهَا -> يَا + أَيُّهَا
df["Uthmani_group"] = df["Uthmani"].replace("", pd.NA).ffill()

NS = "http://www.tei-c.org/ns/1.0"
NSMAP = {None: NS}

TEI = etree.Element("TEI", nsmap=NSMAP)

teiHeader = etree.SubElement(TEI, "teiHeader")
fileDesc = etree.SubElement(teiHeader, "fileDesc")

titleStmt = etree.SubElement(fileDesc, "titleStmt")
title = etree.SubElement(titleStmt, "title")
title.text = "QAMAR Corpus"

publicationStmt = etree.SubElement(fileDesc, "publicationStmt")
publisher = etree.SubElement(publicationStmt, "publisher")
publisher.text = (
    "Mohammadia School of Engineers (EMI), ALELM Research Group, "
    "Computer Science Department"
)

sourceDesc = etree.SubElement(fileDesc, "sourceDesc")
p = etree.SubElement(sourceDesc, "p")
p.text = (
    "The QAMAR Corpus: Original Quranic text in Uthmani script, "
    "along with corresponding morphological feature values, including "
    "the equivalent MSA form, the Stem, the lemma, the root and the pos classification."
)

text = etree.SubElement(TEI, "text")
body = etree.SubElement(text, "body")

for surah_num, surah_df in df.groupby("Surah", sort=False):
    surah_div = etree.SubElement(
        body,
        "div",
        type="surah",
        n=str(surah_num)
    )

    head = etree.SubElement(surah_div, "head")
    head.text = surah_names.get(surah_num, f"سورة {surah_num}")

    for aya_num, aya_df in surah_df.groupby("Aya", sort=False):
        aya_div = etree.SubElement(
            surah_div,
            "div",
            type="aya",
            n=str(aya_num)
        )

        # Build full aya text using only non-empty Uthmani words
        uthmani_words = (
            aya_df["Uthmani"]
            .replace("", pd.NA)
            .dropna()
            .astype(str)
            .tolist()
        )

        phr = etree.SubElement(aya_div, "phr", type="ayaText")
        phr.text = " ".join(uthmani_words)

        # Group by Uthmani_group, not Uthmani.
        # This allows one Uthmani word to contain multiple MSA segments.
        for uthmani_word, word_df in aya_df.groupby("Uthmani_group", sort=False):
            w = etree.SubElement(
                aya_div,
                "w",
                value=str(uthmani_word),
                type="Uthmani"
            )

            for _, row in word_df.iterrows():
                seg = etree.SubElement(
                    w,
                    "seg",
                    value=str(row["word"]),
                    type="msa"
                )

                fs = etree.SubElement(seg, "fs", type="linguistic")

                features = {
                    "stem": row["stem"],
                    "lemma": row["lemma"],
                    "root": row["root"],
                    "pos": row["pos_1"],
                    "altPos": row["pos_2"],
                }

                for name, value in features.items():
                    f = etree.SubElement(fs, "f", name=name)
                    f.text = str(value)

tree = etree.ElementTree(TEI)

tree.write(
    OUTPUT_FILE,
    encoding="utf-8",
    xml_declaration=True,
    pretty_print=True
)

print(f"TEI file created successfully:\n{OUTPUT_FILE}")