from databases.mainsite.constants import GLOBAL_CONTEXT
from databases.mainsite.functions import context_from_request


def global_context(request):
    return {**GLOBAL_CONTEXT, **context_from_request(request)}
