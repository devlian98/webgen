
from django.shortcuts import render
from .models import BusinessType, WebsiteTemplate
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView



def get_business_types(request):
    business_types = BusinessType.objects.all().values('id', 'name')
    # Convert the QuerySet to a list of dictionaries
    business_types_list = list(business_types)
    # Create the response object
    data = {"business_types": business_types_list}
    #data = {"business_types": list(business_types)}
    return JsonResponse(data)

#def home(request):
#    business_types = BusinessType.objects.all()
#    return render(request, 'home.html', {'business_types': business_types})

class UserCreate(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
            })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not username or not email or not password:
            return Response({'error': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key, 'user_id': user.id, 'username': user.username}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username)
        print(password)
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        print(user)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id, 'username': user.username})
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND) 
               
@api_view(['POST'])
def login_view(request):
    print(request)
    username = request.data.get('username')
    password = request.data.get('password')

    if username is None or password is None:
        return JsonResponse({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key, 'user_id': user.id})
    else:
        return JsonResponse({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)    

def home(request):
  return render(request, 'index.html')


def index_view(request):
    # Your logic here
    return render(request, 'restaurant_template/index.html')

def menu_view(request):
    # Your logic here
    return render(request, 'restaurant_template/menu.html')

def about_view(request):
    # Your logic here
    return render(request, 'restaurant_template/about.html')

def book_view(request):
    # Your logic here
    return render(request, 'restaurant_template/book.html')    

def generate_template(request):
    if request.method == 'POST':
        business_type_id = request.POST.get('business_type')
        website_template = WebsiteTemplate.objects.filter(business_type=business_type_id).first()
        print(website_template.template_html)
        if website_template:
            if  website_template.template_html =='restaurant':
                 return render(request, 'restaurant_template/index.html', {'template_html': website_template.template_html})
            elif website_template.template_html =='barber':
                 return render(request, 'barbershop_template/index.html', {'template_html': website_template.template_html})
            elif website_template.template_html =='portfolio':
                 return render(request, 'portfolio_template/index.html', {'template_html': website_template.template_html})
            elif website_template.template_html =='ecommerce':
                 return render(request, 'ecommerce_template/index.html', {'template_html': website_template.template_html})


        else:
            return render(request, 'error.html', {'message': 'Template not found for selected business type'})
    return render(request, 'error.html', {'message': 'Invalid request'})