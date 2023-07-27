from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.vin


class SalesPerson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"id": self.id})

    def __str__(self) -> str:
        return f"{self.first_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_customers", kwargs={"id": self.id})

    def __str__(self) -> str:
        return f"{self.last_name}"


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="Sale",
        on_delete=models.CASCADE)
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="Sale",
        on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer,
        related_name="Sale",
        on_delete=models.CASCADE)
    price = models.FloatField()

    def get_api_url(self):
        return reverse("api_sales", kwargs={"id": self.id})

    def __str__(self) -> str:
        return f"{self.id}"
