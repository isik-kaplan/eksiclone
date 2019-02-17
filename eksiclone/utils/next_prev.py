def lazy_prev(queryset, item):  # optimize it
    _prev = None
    for i, ii in enumerate(queryset):
        if item == ii:
            return {'count': i, 'entry': _prev}
        _prev = ii


def lazy_next(iterable, item):  # optimize it
    return lazy_prev(iterable.reverse(), item)
