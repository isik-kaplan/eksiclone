import random
import string

import faker

from eksiclone.wsgi import application
from mainsite.app_models import (
    User,
    Title,
    Entry,
    TitleChannel,
    UserTrophy
)

fake = faker.Faker()

a = Title, TitleChannel, Entry

print(application)


def random_object(related, is_foeignkey=True):
    final = random.sample(
        list(related.objects.all()),
        int(is_foeignkey) or random.randint(0, related.objects.count())
    )

    if is_foeignkey:
        return final[0]
    return final


def fake_user(count):
    password = '123qwe123qwe'
    for i in range(int(count)):
        fp = fake.profile(),
        fp = fp[0]
        first_name, last_name = fp['name'].rsplit(maxsplit=1)
        new_user = User(
            username=fp['username'],
            first_name=first_name,
            last_name=last_name,
            email=fp['mail'],
            bio=fp['address'],
        )
        new_user.set_password(password)
        new_user.save()
        print('CREATED USER:', new_user)


def fake_entry(count):
    for i in range(int(count)):
        e = Entry(
            title=random_object(Title),
            text=fake.text(),
            author=random_object(User),
            readability=random.choices([True, False], weights=[0.9, 0.1], k=1)[0],
        )
        e.save()

        print('CREATED ENTRY:', e)


def fake_title(count):
    for i in range(int(count)):
        exclude = set(string.punctuation)
        s = fake.text(max_nb_chars=40)
        text = ''.join(ch for ch in s if ch not in exclude)
        new_title = Title(
            text=text,
            creator=random_object(User),
        )

        new_title.save()
        print('CREATED TITLE:', new_title)

        for channel in random_object(TitleChannel, False):
            new_title.channels.add(channel)
            new_title.save()


def fake_trophy(count):
    for i in range(int(count)):
        trop = UserTrophy(
            name=fake.word(),
            description=fake.sentence()
        )
        trop.save()
        print('CREATED TROPHY:', trop)


def fake_channel(count):
    for i in range(int(count)):
        chan = TitleChannel(
            name=fake.word(),
            description=fake.sentence(),
            is_main=random.choices([True, False], weights=[0.2, 0.8], k=1)[0]
        )
        chan.save()
        print('CREATED CHANNEL:', chan)


def fake_relations():
    EC = Entry.objects.count()
    all_entries = list(Entry.objects.all())
    random.shuffle(all_entries)
    for user in User.objects.all():
        print('CREATING RELATIONS FOR:', user)
        entries_to_like = all_entries[0:random.randint(0, EC)]
        random.shuffle(all_entries)
        entries_to_dislike = all_entries[0:random.randint(0, EC)]
        random.shuffle(all_entries)
        entries_to_fav = all_entries[0:random.randint(0, EC)]
        user.dislikes.add(*entries_to_dislike)
        user.likes.add(*entries_to_like)
        user.dislikes.remove(*entries_to_like)
        user.favs.add(*entries_to_fav)


def fake_admin():
    u = User(username='admin', is_staff=True, is_superuser=True)
    u.set_password('adminpassword')
    u.save()


if __name__ == '__main__':
    fake_admin()
    print('Recommended trophy count is 10')
    fake_trophy(input('Trophy count: '))
    print('Recommended channel count is 10')
    fake_channel(input('Channel count: '))
    print('Recommended user count is 100')
    fake_user(input('User count: '))
    print('Recommended title count is 100')
    fake_title(input('Title count: '))
    print('Recommended entry count is 2000')
    fake_entry(input('Entry count: '))
    fake_relations()
