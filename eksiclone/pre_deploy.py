from eksiclone.wsgi import application

from mainsite.app_models import (
    Theme
)

print(application)


def default_themes():
    Theme(name='standard', lights=True, is_built_in=True, path='mainsite/style/light.standard.css').save()
    Theme(name='standard', lights=False, is_built_in=True, path='mainsite/style/dark.standard.css').save()


if __name__ == '__main__':
    if Theme.objects.count() == 0:
        default_themes()
