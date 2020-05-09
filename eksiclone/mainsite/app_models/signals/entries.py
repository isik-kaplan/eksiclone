from django.dispatch import receiver
from django.db.models.signals import post_save

from mainsite.app_models import Entry

@receiver(post_save, sender=Entry, dispatch_uid="update_entry_count")
def update_entry(sender, instance, **kwargs):
    instance.title.entry_count += 1
    instance.title.save()
