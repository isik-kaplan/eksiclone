from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Sum, F

from mainsite.app_models.common import CommonFields
from utils.model_decorators import slugify, represent
from utils.utils import unmake_url


@slugify('username', '-', '-')
@represent(strfields='username')
class User(AbstractUser, CommonFields):
    email = models.EmailField('email address', blank=False, unique=True, null=False)
    theme = models.ForeignKey('Theme', on_delete=models.CASCADE, null=True, blank=True, default=1)
    bio = models.CharField(max_length=1000, default="User Default Bio")
    favs = models.ManyToManyField('Entry', blank=True, related_name="favs")
    likes = models.ManyToManyField('Entry', blank=True, related_name="likes")
    dislikes = models.ManyToManyField('Entry', blank=True, related_name="dislikes")
    entry_pref = models.IntegerField(default=10)
    title_pref = models.IntegerField(default=50)
    trophies = models.ManyToManyField('UserTrophy', blank=True, related_name="trophies")
    reported = models.ManyToManyField('Entry', blank=True)
    is_confirmed = models.BooleanField(default=False)
    is_author = models.BooleanField(default=False)
    lights = models.BooleanField(default=True)
    themes = models.ManyToManyField('Theme', blank=True, related_name="themes")

    @property
    def liked_count(self):
        return self.entry_set.aggregate(Sum(F('likes'))).get('likes__sum', 0)

    @property
    def disliked_count(self):
        return self.entry_set.aggregate(Sum(F('dislikes'))).get('dislikes__sum', 0)

    @property
    def faved_count(self):
        return self.entry_set.aggregate(Sum(F('favs'))).get('favs__sum', 0)

    def toggle_lights(self):
        self.lights = not self.lights
        self.theme = self.theme.opposite()
        self.save()

    @property
    def has_unread_notifications(self):
        return self.notification_set.count() > 0

    def update(self, **kw):
        for k, v in kw.items():
            setattr(self, k, v)
        self.save(update_fields=list(kw.keys()))

    def self_deactivate(self):
        print(self.username, 'DEACTIVATED')
        # TODO implement deactivate

    def self_delete(self):
        print(self.username, 'DELETED')
        # TODO implement delete

    @classmethod
    def from_email(cls, email):
        return User.objects.get(email=email)

    @classmethod
    def from_url(cls, url):
        name = unmake_url(url)
        field = cls.url_field  # noqa
        return cls.objects.get(**{field: name})

    def __str__(self):
        return self.username

    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
