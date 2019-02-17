from django.db.models import Field
from django.db.models.query_utils import DeferredAttribute

from utils.utils import make_url


def slugify(field, link, slug):
    def decorator(cls):
        @property
        def url(self):
            return make_url(getattr(self, field))

        # def get_absolute_url(self):
        #    return reverse_lazy(link, kwargs={**{slug: self.url}})

        cls.url_field = field
        cls.url = url
        # cls.get_absolute_url = get_absolute_url
        return cls

    return decorator


def represent(*exclude, strfields, only=()):
    if exclude and only:
        raise TypeError('Exclude and only parameters can\'t be used at the same time')
        # TODO implement only fields

    def repr_maker(cls):
        attrs = []
        types = (DeferredAttribute, Field)
        for attr in dir(cls):
            obj = getattr(cls, attr)
            if isinstance(obj, types) and attr not in exclude:
                attrs.append(attr)
        name = cls.__name__
        blueprint = name + '(\n{})'

        def maker(self):
            return ''.join(f"    {key}={getattr(self, key)},\n" for key in attrs)

        def __repr__(self):
            return blueprint.format(maker(self))

        def __str__(self):
            if isinstance(strfields, str):
                return getattr(self, strfields)
            else:
                return ' -> '.join(str(getattr(self, i)) for i in strfields)

        cls.__repr__ = __repr__
        cls.__str__ = __str__
        return cls

    return repr_maker
