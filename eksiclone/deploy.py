from django.conf import settings
from whitenoise import WhiteNoise

from eksiclone.wsgi import application

WhiteNoise.autorefresh = settings.WHITENOISE_AUTOREFRESH

application = WhiteNoise(
    application=application(),
    root=settings.MEDIA_ROOT,
    prefix=settings.MEDIA_URL
)

# run the wsgi application here
