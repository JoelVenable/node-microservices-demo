FROM node:12.18.2-alpine3.11

WORKDIR /app
ADD build /app/build
RUN npm install -g serve

EXPOSE 3000

CMD serve -s -l 3000 build