from django.http import HttpResponseRedirect
from django.views.generic.edit import ProcessFormView, FormMixin
from django.views.generic.list import MultipleObjectTemplateResponseMixin, MultipleObjectMixin


class ListAndCreateView(MultipleObjectMixin, MultipleObjectTemplateResponseMixin, FormMixin, ProcessFormView):
    """ A View that displays a list of objects and a form to create a new object.
    The View processes this form. """
    template_name_suffix = ''
    allow_empty = True

    def get(self, request, *args, **kwargs):
        self.object_list = self.get_queryset()
        allow_empty = self.get_allow_empty()
        if not allow_empty and len(self.object_list) == 0:
            raise Exception  # Http404(f"Empty list and '{self.__class__.__name__}s.allow_empty' is False.")
        self.object = None
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        context = self.get_context_data(object_list=self.object_list, form=form)
        return self.render_to_response(context)

    def post(self, request, *args, **kwargs):
        self.object = None
        return super().post(request, *args, **kwargs)

    def form_invalid(self, form):
        self.object_list = self.get_queryset()
        return self.render_to_response(self.get_context_data(object_list=self.object_list, form=form))

    def form_valid(self, form):
        form.save()
        return HttpResponseRedirect(self.request.get_raw_uri())
