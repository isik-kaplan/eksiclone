from django.views.generic import TemplateView

from mainsite.urls import url
from utils.debug import debug


@debug
@url(r'^$', name='index')
class IndexPage(TemplateView):
    template_name = 'mainsite/index/index.html'
