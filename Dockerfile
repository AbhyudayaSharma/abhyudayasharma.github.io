FROM nginx:1.21.1

ENV NGINX_ROOT=/usr/share/nginx/html
ENV NGINX_CONFIG=/etc/nginx/nginx.conf

COPY public ${NGINX_ROOT}
COPY nginx.conf ${NGINX_CONFIG}

# Verify the NGINX configuration
RUN nginx -t -c ${NGINX_CONFIG}

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
