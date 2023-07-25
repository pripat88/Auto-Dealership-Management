from django.http import JsonResponse
from django.views.decorators import require_http_methods
from .models import Appointment, AutomobileVO, Technician
from .encoders import TechnicianEncoder, AppointmentEncoder
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

@require_http_methods(["DELETE", "GET"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            {"technician":technician},
            encoder = TechnicianEncoder,
            safe = False,
        )
    else:
        request.method == "DELETE"
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )

@require_http_methods(["DELETE", "GET", "POST"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            {"appointment":appointment},
            encoder= AppointmentEncoder,
            safe = False,
        )
    elif request.method == "DELETE":
        count,_ =Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted":count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                tech = Technician.objects.get(id=content["technician"])
                content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician Not Available"},
                status = 400,
            )
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder = AppointmentEncoder,
            safe = False
        )

@require_http_methods(["GET", "POST"])
def api_list_appointment(request, vin_vo = None):
    if request.method == "GET":
        if vin_vo is not None:
            appointment =Appointment.objects.filter(vin=vin_vo)
        else:
            appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointment" : appointment},
            encoder = AppointmentEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)

        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician

        try:
            automobile = AutomobileVO.objects(vin=content["vin"])
        except:
            automobile = None
        if automobile is not None:
            content["vip"] = True
        else:
            content["vip"] = False
        content["date"] = datetime.strptime(content["date"], "%Y-%m-%d")
        timeconversion = datetime.strptime(content["time"], "%H:%S")

        content ["time"] = timeconversion

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment, 
            encoder = AppointmentEncoder,
            safe = False,
        )