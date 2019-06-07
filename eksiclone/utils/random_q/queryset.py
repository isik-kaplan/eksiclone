import random

from django.db import models


class QuerySet(models.query.QuerySet):
    """def random(self, amount=1):
        random_pks = []
        while len(random_pks) < amount:
            random_pk = self.__get_random
            if random_pk not in random_pks:
                random_pks.append(random_pk)
        return self.filter(id__in=random_pks)

    @property
    def __get_random(self):
        total = self.count()
        random_index = random.randint(1, total - 1)
        return self[random_index].pk"""

    # The above has problems, temporarily using slower version:

    def random(self, amount=1):
        return self.order_by('?')[:amount]
