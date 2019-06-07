<h1 align="center">
	<br>
	<img width="800" src="https://eksisozluk.com/content/img/new-design/eksisozluk_logo.svg" alt="ekşi sözlük">
	<br>
  <br>
  <br>
</h1>

A working clone of eksisozluk.com. A demo can be found <a href="//isik-kaplan.rocks">here</a>. 

## How to run
Requires 3.6 or higher version of python.

First of all, clone the repo with 
````
git clone github.com/isik-kaplan/eksiclone
````

The project uses postgresql by default, if you want an easier way to test you need to change database settings from

````python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('db-name'),
        'USER': os.environ.get('db-user'),
        'PASSWORD': os.environ.get('db-password'),
        'HOST': os.environ.get('db-host'),
        'PORT': os.environ.get('db-port'),
    }
}
````
to
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
and create a db.sqlite3 file inside /eksiclone near the manage.py.

After that,

````
python3 -m pip install -r requirements.txt
cd eksiclone
python3 manage.py makemigrations mainsite
python3 manage.py migrate
python3 pre_deploy.py
python3 manage.py runserver 0.0.0.0:8000 & python3 manage.py run_chat_server
````

should install the dependencies, create and run migrations, create initial **required** data and start the server.

But you most probably would also want some random data to see the website better, so you would want to run 

````
python3 populate.py 
````

which would create an admin user with username `admin` and password `adminpassword`

After that you can just visit `127.0.0.1:8000` and walk around the website and the admin panel is located at `127.0.0.1:8000/admin/`.

## Website Features

***Q1***
````
How can I delete my entries?

Every entry has a *!* at the very leftmost of their footer. If the entry belongs to you,
it deletes the entry by striking though it, you can undo this by clicking it again without
changing the pages. If page is refreshed when your entry has striked-though, it is gone.
````
***Q2***
````
Every entry has a *!* at the very leftmost of their footer. If the entry doesn't belong to you,
it gets reported. You can only report an entry once, even if you try to do it muiltiple times,
only one report will be dispatched and you will get informed by a footer "already reported" 
next to the report button.
````

## Copyrights
````
This repo uses most of eksisozluk.com's static files for the front-end design, meaning that they own the rights for it. 
This project aims to re-create the back-end of the social platfrom while not touching the front-ent.  
````
