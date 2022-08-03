# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn
RUN yarn add global typescript
RUN yarn add global ts-node

# start app
RUN yarn build 
EXPOSE 3000
CMD yarn start 