from django.db import models
from django.contrib import admin
from django.db import migrations

def create_roles_and_update_profiles(apps, schema_editor):
    """
    Create Role objects and update existing Profile objects to use the new FK.
    """
    Role = apps.get_model('classroom', 'Role')
    Profile = apps.get_model('classroom', 'Profile')

    # Create the roles
    student_role, _ = Role.objects.get_or_create(name='student', defaults={'display_name': 'Оюутан'})
    teacher_role, _ = Role.objects.get_or_create(name='teacher', defaults={'display_name': 'Багш'})

    # This temporary field holds the old string value.
    # Django creates it when changing a CharField to a ForeignKey.
    # We use it to find the correct new Role object.
    for profile in Profile.objects.all():
        if profile.user_type_temp == 'student':
            profile.user_type = student_role
        elif profile.user_type_temp == 'teacher':
            profile.user_type = teacher_role
        profile.save(update_fields=['user_type'])

def revert_role_changes(apps, schema_editor):
    """
    Reverts the changes by moving role names back to the temporary CharField.
    """
    Profile = apps.get_model('classroom', 'Profile')
    for profile in Profile.objects.all():
        if profile.user_type:
            profile.user_type_temp = profile.user_type.name
            profile.save(update_fields=['user_type_temp'])


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0001_initial'), # Make sure this matches your previous migration
    ]

    operations = [
        # When changing a CharField to a ForeignKey, Django automatically renames
        # the old field to `user_type_temp` to hold the string values.
        migrations.RenameField(
            model_name='profile',
            old_name='user_type',
            new_name='user_type_temp',
        ),
        # Then it creates the new `user_type` ForeignKey field.
        migrations.AddField(
            model_name='profile',
            name='user_type',
            field=models.ForeignKey('classroom.Role', on_delete=models.SET_NULL, null=True, blank=True),
        ),
        # Run our custom function to populate the new ForeignKey field.
        migrations.RunPython(create_roles_and_update_profiles, revert_role_changes),
        # Finally, remove the temporary CharField.
        migrations.RemoveField(
            model_name='profile',
            name='user_type_temp',
        ),
    ]
from .models import Profile, Lesson, Reservation, Role, LessonTypes

admin.site.register(Profile)
admin.site.register(Lesson)
admin.site.register(Reservation)
admin.site.register(Role)
admin.site.register(LessonTypes)
