from django.db import models

class BusinessType(models.Model):
    name = models.CharField(max_length=100)

class WebsiteTemplate(models.Model):
    business_type = models.ForeignKey(BusinessType, on_delete=models.CASCADE)
    template_html = models.TextField()
