from django.http import JsonResponse
from django.views.decorators import require_http_methods
from .models import Appointment, AutomobileVO, Technician
from .encoders import TechnicianEncoder, AutomobileVOEncoder
import json
from datetime import datetime


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )