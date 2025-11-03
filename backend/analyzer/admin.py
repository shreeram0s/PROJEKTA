from django.contrib import admin
from .models import Resume, Job, Analysis

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'upload_date')
    readonly_fields = ('upload_date',)

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location')

@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    list_display = ('id', 'match_score', 'created_at')
    readonly_fields = ('created_at',)