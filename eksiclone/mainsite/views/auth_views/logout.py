from django.contrib.auth.views import LogoutView

from mainsite.urls import mainsite_urls as url


@url.re_path(r'auth/logout', name='logout')
class LogoutPage(LogoutView):
    ...
