from .models import Technician, AutomobileVO, Appointment
from common.json import ModelEncoder

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties =[
        "first_name",
        "last_name",
        "employee_id",
    ]