from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomerUser
from classroom.models import Profile

# Define an inline admin descriptor for the Profile model
# This allows you to edit the Profile directly from the User page
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    # Add the ProfileInline to the user admin page
    inlines = (ProfileInline, )

    # Customize the list display to show relevant fields
    # Since you use email as the username, we'll display that
    list_display = ('username', 'first_name', 'last_name', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('username', 'first_name', 'last_name')
    ordering = ('username',)

    # The fieldsets for the edit form need to be updated
    # to use 'email' instead of the default 'username'
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    # The fieldsets for the add form also need to be updated
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password', 'password2'),
        }),
    )

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

# Register your custom user model with the custom admin class
admin.site.register(CustomerUser, CustomUserAdmin)