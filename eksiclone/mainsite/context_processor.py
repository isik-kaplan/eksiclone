from databases.mainsite.constants import GLOBAL_CONTEXT, GLOBAL_DB_CONTEXT
from databases.mainsite.functions import context_from_request


def global_context(request):
    return {
        **GLOBAL_CONTEXT,
        **{k: v.all() for k, v in GLOBAL_DB_CONTEXT.items()},
        **context_from_request(request),
    }
