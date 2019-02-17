import random
import string

import faker

fake = faker.Faker()

from eksiclone.wsgi import application

application

from mainsite.app_models import (
    User,
    Title,
    Entry,
    TitleChannel,
    UserTrophy
)

a = Title, TitleChannel, Entry


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
        for e1, e2, e3, t in zip(random_object(Entry, False), random_object(Entry, False), random_object(Entry, False),
                                 random_object(UserTrophy, False)):
            new_user.likes.add(e1)
            new_user.dislikes.add(e2)
            new_user.favs.add(e3)
            new_user.trophies.add(t)
            new_user.save()


def fake_entry(count):
    for i in range(int(count)):
        Entry(
            title=random_object(Title),
            text=fake.text(),
            author=random_object(User),
            readability=random.choices([True, False], weights=[0.9, 0.1], k=1)[0],
        ).save()


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

        for channel in random_object(TitleChannel, False):
            new_title.channels.add(channel)
            new_title.save()


def fake_trophy(count):
    for i in range(int(count)):
        UserTrophy(
            name=fake.word(),
            description=fake.sentence()
        ).save()


def fake_channel(count):
    for i in range(int(count)):
        TitleChannel(
            name=fake.word(),
            description=fake.sentence(),
            is_main=random.choices([True, False], weights=[0.2, 0.8], k=1)[0]
        ).save()


if __name__ == '__main__':
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
