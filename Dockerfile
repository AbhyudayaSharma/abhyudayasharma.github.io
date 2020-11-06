FROM nginx:1.19.4

ENV NGINX_ROOT=/usr/share/nginx/html
ENV NGINX_CONFIG=/etc/nginx/nginx.conf

COPY build ${NGINX_ROOT}
COPY nginx.conf ${NGINX_CONFIG}

# Verify the NGINX configuration
RUN nginx -t -c ${NGINX_CONFIG}

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
