# haha hacker boi
# you forced me to do this django
# thanks random stranger from stackoverflow for this

import re
from django.template import base
base.tag_re = re.compile(base.tag_re.pattern, re.DOTALL)