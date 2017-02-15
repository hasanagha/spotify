import json
import requests

from django.views.generic import View
from django.http import JsonResponse

from main.settings import SPOTIFY_API_URL


class SearchView(View):

    def get(self, request, search_type, *args, **kwargs):

        # get search term
        search_term = self.request.GET.get('search_term')

        records = self.get_result_from_spotify(search_type, search_term)

        return JsonResponse(records, safe=False)

    def get_result_from_spotify(self, search_type, search_term):
        data = {
            'status': True,
            'records': ''
        }

        url = SPOTIFY_API_URL.format(
            search_term=search_term,
            search_type=search_type
        )

        response = requests.get(url)
        records = json.loads(response.text)

        if response.status_code == 200:
            data['records'] = records
        else:
            data['status'] = False
            data['error'] = records['error']['message']

        return data
