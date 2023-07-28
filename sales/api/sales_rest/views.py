from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .models import AutomobileVO, SalesPerson, Sale, Customer
from .encoders import (
    AutomobileVOEncoder,
    SalesPersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


@require_http_methods(["GET"])
def api_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.filter(sales_record_isnull=True)
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    if request.method == "GET":
        try:
            sales_persons = SalesPerson.objects.all()
            return JsonResponse(
                {"sales_persons": sales_persons},
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "There are no sales persons"},
                status=404,
            )

    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create salesperson"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sales_person_detail(request, id):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )

    elif request.method == "DELETE":
        try:
            count, _ = SalesPerson.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "No sales person to delete"},
                status=400,
            )

    else:
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=id).update(**content)
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "There are no customers"},
                status=404,
            )

    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create customer"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )

    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No customer to delete"},
                status=404,
            )

    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = SalesPerson.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_sales(request, sales_person_employee_id=None):
    if request.method == "GET":
        if sales_person_employee_id is not None:
            sales = Sale.objects.filter(
                sales_person_employee_id=sales_person_employee_id
            )
        else:
            sales = Sale.objects.all()

        sales_list = [
            {
                "id": sale.id,
                "automobile": {
                    "vin": sale.automobile.vin,
                    "sold": sale.automobile.sold,
                },
                "salesperson": {
                    "first_name": sale.salesperson.first_name,
                    "last_name": sale.salesperson.last_name,
                    "employee_id": sale.salesperson.employee_id,
                },
                "customer": {
                    "first_name": sale.customer.first_name,
                    "last_name": sale.customer.last_name,
                },
            }
            for sale in sales
        ]
        return JsonResponse(
            {"sales": sales_list},
            safe=False,
        )
    content = json.loads(request.body)
    record_of_sale = Sale.objects.filter(automobile_vin=content["automobile"])
    if record_of_sale:
        return JsonResponse(
            {"message": "This automobile has already been sold"},
            status=400,
        )
    else:
        try:
            sales = Sale.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "could not create sales record"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404,
            )

    elif request.method == "DELETE":
        try:
            count, _ = Sale.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No customer to delete"},
                status=404,
            )
            )

    else:
        content = json.loads(request.body)
        try:
            if "sales_person" in content:
                sales_person = SalesPerson.objects.get(
                    id=content["sales_person"]
                    )
                content["sales_person"] = sales_person
        except SalesPerson.DoesNotexist:
            return JsonResponse(
                {"message": "Invalid sales person to ID"},
                status=400,
            )
            )
        try:
            if "customer" in content:
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
        except Customer.DoesNotexist:
            return JsonResponse(
                {"message": "Invalid customer ID"},
                status=400,
            )
            )
        try:
            if "automobile" in content:
                automobile = AutomobileVO.objects.get(
                    vin=content["automobile"]
                    )
                content["automobile"] = automobile
        except AutomobileVO.DoesNotexist:
            return JsonResponse(
                {"message": "Invalid automobile VIN"},
                status=400,
            )
            )
        try:
            Sale.objects.filter(id=id).update(**content)
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404,
            )


@require_http_methods
def api_sales_history(request):
    if request.method == "GET":
        sales = Sale.objects.all().order_by("salesperson__last_name")
        sales_list = [
            {
                "id": sale.id,
                "automobile": {
                    "vin": sale.automobile.vin,
                    "sold": sale.automobile.sold,
                },
                "salesperson": {
                    "first_name": sale.salesperson.first_name,
                    "last_name": sale.salesperson.last_name,
                    "employee_id": sale.salesperson.employee_id,
                },
                "customer": {
                    "first_name": sale.customer.first_name,
                    "last_name": sale.customer.last_name,
                },
            }
            for sale in sales
        ]
        return JsonResponse(
            {"sales": sales_list},
            safe=False,
        )
