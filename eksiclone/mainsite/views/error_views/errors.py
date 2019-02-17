from django.views.generic import TemplateView


class handler404(TemplateView):
    template_name = 'mainsite/mainsite/index.html'
