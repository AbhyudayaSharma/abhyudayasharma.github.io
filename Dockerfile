FROM nginx:1.22.0

ARG NGINX_ROOT=/var/www/abhyudaya.dev
ARG NGINX_CONFIG_ROOT=/etc/nginx/

COPY public ${NGINX_ROOT}
COPY nginx ${NGINX_CONFIG_ROOT}

# Verify the NGINX configuration
RUN nginx -t

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
