'''from django import template
from django.utils.html import format_html_join, mark_safe
import itertools
from mainsite.models import Title
import datetime as d
from django.utils.timezone import make_aware
from mainsite.entry_modifier import *

register = template.Library()


"""@register.filter(name="dummy")
def messagetolink(text):
    split = text.split('dummy')
    even, odd = split[0::2], split[1::2]
    return format_html_join('', '{}<a href="' + site_name + '{}">{}</a>', ((a, ("_".join(b.split())), b) for a, b in itertools.zip_longest(even, odd, fillvalue='')))"""

@register.filter(name="namelink")
def username(text):
    return "_".join(str(text).split())

@register.filter(name="e2l1")
def messagetolink(text):
    new = tags_to_link(text)
    split = new.split('$$')
    even, odd = split[0::2], split[1::2]
    return format_html_join('', '{}<a{}>{}</a>',((a, mark_safe(b.split(">")[0]) if len(b.split(">")[-1:]) > 0 else "", mark_safe(b.split(">")[-1]) if len(b.split(">")[-1:]) > 0 else "") for a, b in itertools.zip_longest(even, odd, fillvalue='')))


@register.filter(name="today")
def todaycount(the_object):
    return len(the_object.entry_set.filter(entry_date2__gte=make_aware(d.datetime.today()-d.timedelta(days=1))).exclude(entry_readability=False))


@register.filter(name="week")
def weekcount(the_object):
    return len(the_object.entry_set.filter(entry_date2__gte=make_aware(d.datetime.today()-d.timedelta(days=7))).exclude(entry_readability=False))

@register.filter(name="before")
def beforecount(the_object):
    title = the_object.entry_title
    for i, v in enumerate(title.entry_set.filter(entry_readability=True)):
        if v == the_object:
            return i


@register.filter(name="beforelink")
def beforelink(the_object):
    global index
    title = the_object.entry_title
    for i, v in enumerate(title.entry_set.filter(entry_readability=True)):
        if v == the_object:
            index = i-1
    for i, v in enumerate(title.entry_set.filter(entry_readability=True)):
        if i == index:
            return v.pk


@register.filter(name="after")
def beforecount(the_object):
    title = the_object.entry_title
    entries = Title.objects.get(title_text=title).entry_set.filter(entry_readability=True)
    for i, v in enumerate(title.entry_set.filter(entry_readability=True)):
        if v == the_object:
            return len(entries)-i-1


@register.filter(name="afterlink")
def beforelink(the_object):
    global index
    title = the_object.entry_title
    for i, v in enumerate(title.entry_set.filter(entry_readability=True)):
        if v == the_object:
            index = i+1
    for i, v in enumerate(title.entry_set.filter(entry_readability=True)):
        if i == index:
            return v.pk


@register.filter(name="beforesorted")
def beforecount(the_object):
    title = the_object.entry_title
    for i, v in enumerate(title.entry_set.filter(entry_readability=True).order_by("entry_points").reverse()):
        if v == the_object:
            return i


@register.filter(name="beforelinksorted")
def beforelink(the_object):
    global index2
    title = the_object.entry_title
    for i, v in enumerate(title.entry_set.filter(entry_readability=True).order_by("entry_points").reverse()):
        if v == the_object:
            index2 = i-1
    for i, v in enumerate(title.entry_set.filter(entry_readability=True).order_by("entry_points").reverse()):
        if i == index2:
            return v.pk


@register.filter(name="aftersorted")
def beforecount(the_object):
    title = the_object.entry_title
    entries = Title.objects.get(title_text=title).entry_set.filter(entry_readability=True).order_by("entry_points").reverse()
    for i, v in enumerate(title.entry_set.filter(entry_readability=True).order_by("entry_points").reverse()):
        if v == the_object:
            return len(entries)-i-1


@register.filter(name="afterlinksorted")
def beforelink(the_object):
    global index2
    title = the_object.entry_title
    for i, v in enumerate(title.entry_set.filter(entry_readability=True).order_by("entry_points").reverse()):
        if v == the_object:
            index2 = i+1
    for i, v in enumerate(title.entry_set.filter(entry_readability=True).order_by("entry_points").reverse()):
        if i == index2:
            return v.pk


@register.filter(name="username")
def username(text):
    return text.replace(" ", "_")'''
