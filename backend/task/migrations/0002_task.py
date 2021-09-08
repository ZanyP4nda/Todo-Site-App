from django.db import migrations

def create_data(apps, schema_editor):
	Task = apps.get_model('task', 'Task')
	Task(task="Complete This Task!", is_completed=False).save()

class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
		migrations.RunPython(create_data)
    ]
