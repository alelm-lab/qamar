from django.core.management.base import BaseCommand
from qamar_app.models import QuranWord
import xml.etree.ElementTree as ET


class Command(BaseCommand):
    help = "Load Quran data from an XML file"

    def add_arguments(self, parser):
        # Add argument for specifying the XML file path
        parser.add_argument('xml_file', type=str, help='Path to the XML file containing Quran data')

    def handle(self, *args, **kwargs):
        xml_file = kwargs['xml_file']  # Retrieve the file path from the command-line argument

        try:
            # Parse the XML file
            tree = ET.parse(xml_file)
            root = tree.getroot()

            # Clear existing data in the database (optional)
            QuranWord.objects.all().delete()

            # Iterate through the XML structure and populate the database
            record_count = 0
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

                        # Save the record to the database, ignoring the Aya number
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

                        # Log each record
                        print(
                            f"Inserted record: Surah: {surah_name}, Uthmani: {uthmani_value}, "
                            f"MSA: {msa_value}, Stem: {stem}, Lemma: {lemma}, Root: {root_value}, POS1: {pos1}, POS2: {pos2}"
                        )

            # Print final summary
            self.stdout.write(self.style.SUCCESS(f"Data loaded successfully. Total records: {record_count}"))
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"File not found: {xml_file}"))
        except ET.ParseError:
            self.stderr.write(self.style.ERROR("Error parsing the XML file."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"An unexpected error occurred: {e}"))
