from django.db import models

class Task(models.Model):
	task = models.CharField(max_length=250)
	is_completed = models.BooleanField(default=False)
	creation_date = models.DateField("Creation Date", auto_now_add=True)
	def __str__(self):
		return self.name
