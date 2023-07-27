from django.urls import path

from sales_rest.views import (
    api_sale,
    api_sales,
    api_customers,
    api_customer,
    api_automobiles,
    api_sales_person,
    api_sales_person_detail,
    api_sales_history,
)

urlpatterns = [
    path("automobiles/", api_automobiles, name="api_automobiles"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales_person/", api_sales_person, name="api_sales_person"),
    path(
        "sales_person/<int:pk>/",
        api_sales_person_detail, name="api_sales_person_detail"
        ),
    path(
        "sales_person/<int:sales_person_employee_id>/sales/",
        api_sales, name="api_employee_sales_records"
        ),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
    path("sales/history/", api_sales_history, name="api_sales_history")
]
