from rest_framework import permissions

EDIT_METHODS = ['PUT', 'PATCH']


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method in EDIT_METHODS:
            return obj.author == request.user
        return obj.author == request.user or request.user.is_superuser
