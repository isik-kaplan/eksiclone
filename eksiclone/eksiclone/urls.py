"""eksiclone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, include, path

from mainsite.api.urls import urlpatterns as apiurls
from mainsite.urls import urlpatterns as mainurls
from utils.utils import init

init('mainsite.views')
init('mainsite.api.views')

urlpatterns = [
    re_path(r'^', include(mainurls)),
    re_path('^admin/', admin.site.urls),
    re_path('^api/', include(apiurls))
]

# handler400 = 'mainsite.views.errors.handler400'
# handler404 = 'mainsite.views.errors.handler404'
# handler403 = 'mainsite.views.errors.handler403'
# handler500 = 'mainsite.views.errors.handler500'
