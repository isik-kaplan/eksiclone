from django.core.paginator import Paginator, InvalidPage


class SafePaginator(Paginator):
    def validate_number(self, number):
        try:
            return super().validate_number(number)
        except InvalidPage:
            if number > 1:
                return self.num_pages
            if number == 0:
                return 1
