from django.forms import ModelForm
from django import forms
from .models import Contact


class ContactForm(ModelForm):

    email = forms.EmailField()
    subject = forms.CharField()
    message = forms.CharField(label="", widget=forms.Textarea(
        attrs={'class': 'form_input', 'placeholder': 'Please feel free to Contact us with any questions or concerns!', 'rows': '10', 'cols': '100'}))

    class Meta:
        model = Contact
        fields = '__all__'
