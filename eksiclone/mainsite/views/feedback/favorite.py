from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import View

from mainsite.app_models import Entry
from mainsite.urls import url


@url('^feedback/fav')
class Favorite(View):
    @method_decorator(login_required)
    def post(self, request):
        entry = Entry.objects.get(pk=int(request.body))
        if request.user.favs.filter(pk=entry.pk).exists():
            request.user.favs.remove(entry)
        else:
            request.user.favs.add(entry)
        return HttpResponse(status=200)
