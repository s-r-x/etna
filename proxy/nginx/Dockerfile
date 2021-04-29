FROM alpine:3.6

RUN apk add --no-cache nginx-mod-http-lua
RUN apk add --no-cache bind

# Delete default config
RUN rm -r /etc/nginx/conf.d && rm /etc/nginx/nginx.conf

# Create folder for PID file
RUN mkdir -p /run/nginx

# Add our nginx conf
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx"]
