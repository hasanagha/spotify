# coding=utf-8
"""Mixins can be used in all apps"""

# Django
from django import http


class AjaxViewMixin(object):
    """ Only allows ajax requests in whatever view this is mixed into. """

    def dispatch(self, request, *args, **kwargs):
        request_meta = request.META

        if 'HTTP_X_REQUESTED_WITH' not in request_meta or not request.is_ajax():
            raise http.Http404("Only AJAX requests are allowed to this view")

        return super(AjaxViewMixin, self).dispatch(request, *args, **kwargs)
