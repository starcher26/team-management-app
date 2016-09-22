# team-management-app

This is a small application able to manage teams and their members.

# Installation

To install this app, clone the repository into your workdir :
I assume git is installed on your computer :
sudo apt-get install git

git clone https://github.com/starcher26/team-management-app

cd team-management-app

2 solutions :

EITHER you use docker or docker-compose :

Make sure Docker is installed on your system :
Exemple, on Ubuntu :
sudo apt-get install docker.io

Docker:
Build your image :

sudo docker build -t team-management-app .

Then, run the official mongo docker image :

sudo docker run --name tmamongodb -d mongo

Finnaly, we established a connection between the two containers :

sudo docker run --link tmamongodb:db -p 127.0.0.1:3000:3000 -d team-management-app

Try your connectivity.

Docker-compose:

sudo apt-get -y install python-pip

sudo pip install docker-compose

Then we run the app using :

docker-compose up


OR you hate to install a complete mean stack environnement:

I will enumerate all packages needed on Ubuntu :

NodeJS and npm :

sudo apt-get install nodejs

sudo apt-get install npm

MongoDB :

Installation from https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ :

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

sudo apt-get update

sudo apt-get install -y mongodb-org



ExpressJS and AngularJS:

Make sure you are still in your app directory (team-management-app).

sudo npm install
sudo bower install --allow-root


Nodemon:

npm install -g nodemon

Finally, to run your app you just have to key in :

nodemon

Now you can access to http://localhost:3000.


