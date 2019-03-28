from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import View

from mainsite.app_models import User, Title
from mainsite.urls import mainsite_urls as url


@url.re_path('^notification/followtitle')
class FollowTitle(LoginRequiredMixin, View):
    def post(self, request):
        body = request.body.decode("utf-8")
        user = request.user
        title = Title.objects.get(text=body)
        if user.followed_titles.filter(pk=title.pk).exists():
            user.followed_titles.remove(title)
        else:
            user.followed_titles.add(title)
        return HttpResponse(status=200)


@url.re_path('^notification/followuser')
class FollowUser(LoginRequiredMixin, View):
    def post(self, request):
        body = request.body.decode("utf-8")
        user = request.user
        _user = User.objects.get(username=body)
        if user.followed_users.filter(pk=_user.pk).exists():
            user.followed_users.remove(_user)
        else:
            user.followed_users.add(_user)
        return HttpResponse(status=200)
