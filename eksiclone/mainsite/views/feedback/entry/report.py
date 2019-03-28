from django.http import Http404, HttpResponse
from django.views.generic import View

from mainsite.app_models import Entry
from mainsite.urls import mainsite_urls as url
from utils.utils import get_client_ip


@url.re_path('^feedback/report')
class Report(View):
    def post(self, request):
        entry = Entry.objects.get(pk=int(request.body))
        if request.user.is_authenticated:
            user = request.user
            username = user.username
            if user.reported.filter(pk=entry.pk).exists():
                raise Http404()
            user.reported.add(entry)
        else:
            username = 'Visitor, ip: {}'.format(get_client_ip(request))
        print('{} reported {}'.format(username, entry))
        return HttpResponse(status=200)
