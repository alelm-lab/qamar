import json
import logging

from django.core.paginator import Paginator
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import CorrectionSuggestion, QuranWord

logger = logging.getLogger(__name__)


def serialize_word(word):
    return {
        'id': word.idquran_words,
        'surah_name': word.surah_name,
        'uthmani': word.uthmani,
        'msa': word.msa,
        'stem': word.stem,
        'lemma': word.lemma,
        'root': word.root,
        'pos1': word.pos1,
        'pos2': word.pos2,
    }


@require_GET
def api_words(request):
    queryset = QuranWord.objects.all().order_by('idquran_words')

    search = request.GET.get('search', '').strip()
    surah_name = request.GET.get('surah_name', '').strip()
    root = request.GET.get('root', '').strip()
    lemma = request.GET.get('lemma', '').strip()
    pos1 = request.GET.get('pos1', '').strip()
    pos2 = request.GET.get('pos2', '').strip()

    if search:
        queryset = queryset.filter(
            Q(uthmani__icontains=search) |
            Q(msa__icontains=search) |
            Q(stem__icontains=search) |
            Q(lemma__icontains=search) |
            Q(root__icontains=search) |
            Q(pos1__icontains=search) |
            Q(pos2__icontains=search)
        )

    if surah_name and surah_name not in ['All Surahs', 'All Surahs / كل السور']:
        queryset = queryset.filter(surah_name=surah_name)

    if root:
        queryset = queryset.filter(root__icontains=root)

    if lemma:
        queryset = queryset.filter(lemma__icontains=lemma)

    if pos1:
        queryset = queryset.filter(pos1__icontains=pos1)

    if pos2 and pos2 not in ['All POS', 'All POS / كل الأنواع']:
        queryset = queryset.filter(pos2__icontains=pos2)

    try:
        per_page = int(request.GET.get('per_page', 15))
    except ValueError:
        per_page = 15

    per_page = min(max(per_page, 1), 100)

    try:
        page_number = int(request.GET.get('page', 1))
    except ValueError:
        page_number = 1

    paginator = Paginator(queryset, per_page)
    page_obj = paginator.get_page(page_number)

    return JsonResponse({
        'results': [serialize_word(word) for word in page_obj.object_list],
        'page': page_obj.number,
        'per_page': per_page,
        'total_pages': paginator.num_pages,
        'total_results': paginator.count,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
    })


@require_GET
def api_word_detail(request, word_id):
    word = get_object_or_404(QuranWord, idquran_words=word_id)
    return JsonResponse(serialize_word(word))


@csrf_exempt
@require_POST
def api_save_suggestion(request):
    try:
        data = json.loads(request.body.decode('utf-8'))

        line_number = data.get('line_number')
        msa = data.get('msa', '').strip()
        stem = data.get('stem', '').strip()
        lemma = data.get('lemma', '').strip()
        root = data.get('root', '').strip()
        pos1 = data.get('pos1', '').strip()
        pos2 = data.get('pos2', '').strip()

        if not line_number:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid line number.',
                'ar': 'رقم السطر غير صالح.'
            }, status=400)

        if not any([msa, stem, lemma, root, pos1, pos2]):
            return JsonResponse({
                'status': 'error',
                'message': 'Please provide at least one suggestion.',
                'ar': 'يرجى تقديم اقتراح واحد على الأقل.'
            }, status=400)

        CorrectionSuggestion.objects.create(
            line_number=int(line_number),
            msa=msa,
            stem=stem,
            lemma=lemma,
            root=root,
            pos1=pos1,
            pos2=pos2,
        )

        return JsonResponse({
            'status': 'success',
            'message': 'Thank you for your contribution.',
            'ar': 'شكراً لمساهمتكم.'
        })

    except Exception as e:
        logger.error(f'Error in api_save_suggestion: {e}')
        return JsonResponse({
            'status': 'error',
            'message': 'An error occurred while saving the suggestion.',
            'ar': 'حدث خطأ أثناء حفظ الاقتراح.'
        }, status=500)