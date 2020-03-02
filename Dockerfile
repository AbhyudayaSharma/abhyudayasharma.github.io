FROM nginx:1.17.8

ENV NGINX_CONFIG=/etc/nginx/nginx.conf

COPY build /usr/share/nginx/html
COPY nginx.conf ${NGINX_CONFIG}

EXPOSE 80
EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]
