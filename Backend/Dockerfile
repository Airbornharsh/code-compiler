FROM nginx:alpine

RUN apk add --no-cache \
  nodejs \
  python3 \
  openjdk11 \
  gcc \
  g++ \
  ruby \
  lua5.3 \
  perl \
  go \
  rust \
  cargo


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]