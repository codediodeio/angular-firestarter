# base image
FROM jgwill/nodalping:latest
 
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
 
# install and cache app dependencies
COPY package.json /usr/src/app/package.json

RUN echo "Yarning the Project"
RUN yarn install

#RUN npm install -g @angular/cli

# add app
COPY . /usr/src/app

# start app
#CMD ng serve --host 0.0.0.0 --port 4223 --disableHostCheck
#RUN yarn autoclean
#RUN npm cache clean

RUN  rm -rf ~/.npm/ ~/.yarn/


