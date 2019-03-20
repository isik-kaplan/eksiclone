from django.db.models import signals
from django.dispatch import receiver
from django.utils.html import mark_safe

from mainsite.app_models import Entry, Notification, User


@receiver(signals.post_save, sender=Entry)
def create_notification_new_entry(**kwargs):
    instance = kwargs['instance']
    created = kwargs['created']
    if created:
        for user in instance.title.followers.all():
            Notification(
                to=user,
                name="New Entry",
                description="Hey there is a new entry at {}".format(instance.title)
            ).save()


@receiver(signals.post_save, sender=User)
def create_notification_welcome(**kwargs):
    instance = kwargs['instance']
    created = kwargs['created']
    if created:
        Notification(
            to=instance,
            name="Welcome",
            description=mark_safe(
                "Hey there, welcome aboard! You may wanna check out our <a href={}>welcome</a> page".format(
                    '/welcome'
                )
            ),  # TODO use django.contrib.staticfiles.templatetags.staticfiles.static
        ).save()
