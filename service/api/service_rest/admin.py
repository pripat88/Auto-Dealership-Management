from django.contrib import admin
from .models import Appointment, AutomobileVO, Technician


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass


@admin.register(Technician)
class Technician(admin.ModelAdmin):
    pass
