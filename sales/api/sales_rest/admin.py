from django.contrib import admin
from .models import SalesPerson, AutomobileVO, Customer, Sale

admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(Sale)
admin.site.register(AutomobileVO)
