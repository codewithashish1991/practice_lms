"""Validate your data before store."""
from rest_framework import serializers
from categories.models import Categorie
from courses.models import Course


class CategoriesSerializer(serializers.ModelSerializer):
    """Serilizers for categories."""

    course_count = serializers.SerializerMethodField('get_course_count')

    class Meta:
        """Serilizers for categories."""

        model = Categorie
        fields = [
            'category_id',
            'title',
            'cat_type',
            'slug',
            'parent',
            'image',
            'course_count',
            'status',
            'created_at',
            'updated_at',
        ]

    def get_course_count(self, obj):
        """Return category's courses count."""
        def get_sub_cat(cat_id):
            sarr = []
            subcat = Categorie.objects.select_related('parent').filter(
                parent=cat_id
            ).all()
            if subcat.exists():
                for sc in subcat:
                    res = get_sub_cat(sc.category_id)
                    sarr.append(sc.category_id)
                    if res:
                        for re in res:
                            sarr.append(re)
            if sarr:
                return sarr
            else:
                return ''
        if obj.category_id:
            main_cat_count = Course.objects.filter(
                category_id=obj.category_id
            ).count()
            sub_cat = get_sub_cat(obj.category_id)
            sub_cat_count = Course.objects.filter(
                category_id__in=sub_cat
            ).count()
            return main_cat_count + sub_cat_count
        else:
            return 0
