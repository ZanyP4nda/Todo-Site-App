from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from task import views

# Django REST framework's routers class handles separating "api/task" (For GET and POST)  and "api/task/{id}" (For PUT and DELETE)

router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'task')

urlpatterns = [
    path('admin/', admin.site.urls),
	path('api/', include(router.urls))
]
