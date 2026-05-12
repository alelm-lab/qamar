# qamar_app/management/commands/load_data.py
from django.core.management.base import BaseCommand
from qamar_app.models import QuranWord
import xml.etree.ElementTree as ET
from django.db import connection

class Command(BaseCommand):
    help = "Load Quran data from an XML file into the quran_words table."

    def add_arguments(self, parser):
        parser.add_argument('xml_file', type=str, help='Path to the XML file containing Quran data.')

    def handle(self, *args, **kwargs):
        xml_file = kwargs['xml_file']  # Get the XML file path from the command-line argument

        try:
            # Parse the XML file
            tree = ET.parse(xml_file)
            root = tree.getroot()

            # Clear existing data
            QuranWord.objects.all().delete()

            # Reset auto-increment
            with connection.cursor() as cursor:
                cursor.execute("ALTER TABLE quran_words AUTO_INCREMENT = 1")

            record_count = 0

            # Iterate through the XML structure and populate the database
            for chapter in root.findall('Chapter'):
                surah_name = chapter.get('Surah_name')

                for word_u in chapter.findall('Word_U'):
                    uthmani_value = word_u.get('value')

                    for word_m in word_u.findall('Word_M'):
                        msa_value = word_m.get('value')
                        stem = word_m.get('stem')
                        lemma = word_m.get('Lemma')
                        root_value = word_m.get('root')
                        pos1 = word_m.get('pos1')
                        pos2 = word_m.get('pos2')

                        # Save the record to the database
                        QuranWord.objects.create(
                            surah_name=surah_name,
                            uthmani=uthmani_value,
                            msa=msa_value,
                            stem=stem,
                            lemma=lemma,
                            root=root_value,
                            pos1=pos1,
                            pos2=pos2
                        )

                        record_count += 1
                        self.stdout.write(self.style.SUCCESS(
                            f"Inserted record {record_count}: {surah_name} - {uthmani_value} | MSA: {msa_value}"
                        ))

            self.stdout.write(self.style.SUCCESS(f"Data loaded successfully. Total records inserted: {record_count}"))

        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"File not found: {xml_file}"))
        except ET.ParseError:
            self.stderr.write(self.style.ERROR("Error parsing the XML file."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"An unexpected error occurred: {e}"))
