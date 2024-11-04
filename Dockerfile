FROM nginx:stable-alpine 

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
