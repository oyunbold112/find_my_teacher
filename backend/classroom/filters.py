from django_filters import rest_framework as filters
from .models import Lesson

class LessonFilter(filters.FilterSet):
    lesson_type = filters.CharFilter(field_name='lesson_type', lookup_expr='exact')
    description = filters.CharFilter(field_name='description', lookup_expr='icontains')
    lesson_duration = filters.NumberFilter(method='filter_duration')

    def filter_duration(self, queryset, name, value):
        return queryset.filter(**{name: int(value)})
    class Meta:
        model = Lesson
        fields = ['lesson_type', 'description', 'lesson_duration']
