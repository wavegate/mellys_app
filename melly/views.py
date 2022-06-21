from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import Dogs
from django.urls import reverse
from datetime import datetime, date
from django.utils import timezone
import re

def index(request):
    template = loader.get_template('index.html')
    melly = Dogs.objects.first()
    dob = melly.dob.strftime(r"%#m/%#d/%Y")
    age = round((date.today() - melly.dob).days / 365)
    breed = re.search(r"(.*)\s\(.*\)", melly.breed).group(1)
    color = melly.color.capitalize()
    convertedLastFed = timezone.localtime(melly.lastFed)
    convertedLastPooped = timezone.localtime(melly.lastPooped)
    lastFed = convertedLastFed.strftime(r"%#I:%M %p")
    lastPooped = convertedLastPooped.strftime(r"%#I:%M on %#m/%#d/%Y")
    lastFedHour = (convertedLastFed.hour + melly.lastFed.minute/60) % 12
    lastPoopedHour = (convertedLastPooped.hour + melly.lastPooped.minute/60) % 12
    nowHour = (timezone.localtime(timezone.now()).hour + timezone.localtime(timezone.now()).minute/60) % 12
    context = {
        'melly': melly,
        'dob': dob,
        'age': age,
        'breed': breed,
        'color': color,
        'lastFed': lastFed,
        'lastFedHour': lastFedHour,
        'lastPoopedHour': lastPoopedHour,
        'nowHour': nowHour,
        'lastPooped': lastPooped,
    }
    return HttpResponse(template.render(context, request))

def updateLastFed(request):
    melly = Dogs.objects.first()
    melly.lastFed = timezone.now()
    melly.save()
    return HttpResponseRedirect(reverse('index'))

def updateLastPooped(request):
    melly = Dogs.objects.first()
    melly.lastPooped = timezone.now()
    melly.save()
    return HttpResponseRedirect(reverse('index'))