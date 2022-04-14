FROM node:12

RUN npm install -g typescript

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/
COPY ./service ./services
COPY ./packages ./packages

RUN chmod -R 777 /usr/src/app

WORKDIR /usr/src/app/services
RUN rm -rf ./node_modules
RUN rm -rf ./dist

WORKDIR /usr/src/app/packages/petpass-core
RUN rm -rf ./node_modules
RUN rm -rf ./dist

WORKDIR /usr/src/app/packages/petpass-endpoints
RUN rm -rf ./node_modules
RUN rm -rf ./dist

WORKDIR /usr/src/app/packages
RUN node build-packages.js

WORKDIR /usr/src/app/services
RUN npm run build

EXPOSE 9000
CMD [ "node", "/usr/src/app/services/dist/index.js" ]



#ENTRYPOINT ["tail", "-f", "/dev/null"]