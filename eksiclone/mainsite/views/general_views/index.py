from django.views.generic import TemplateView

from mainsite.urls import url
from utils.debug import debug
from utils.decorators import template_switch


@debug
@template_switch
@url(r'^$', name='index')
class IndexPage(TemplateView):
    _template_name = 'mainsite/index/index.html'
