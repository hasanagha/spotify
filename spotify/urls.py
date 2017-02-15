from django.conf.urls import url

from spotify.views.home import HomePageView
from spotify.views.search import SearchView


urlpatterns = [
    url(r'^$', HomePageView.as_view(), name='home'),
    url(r'^search/(?P<search_type>[\w-]+)/$', SearchView.as_view(), name='search'),
]
