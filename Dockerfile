FROM oven/bun:1

ARG VITE_WS_HOST
ENV VITE_WS_HOST=$VITE_WS_HOST

WORKDIR /app

COPY . .

RUN bun install
RUN VITE_WS_HOST=${VITE_WS_HOST} bun build:cl

RUN apt-get update
RUN apt-get install nginx -y
COPY nginx.conf /etc/nginx/sites-enabled/default

EXPOSE 80

# CMD bash -c "bunx servor /app/services/cl/dist & bun /app/services/sv/index.ts"

CMD bash -c "service nginx start & bun /app/services/sv/index.ts"

# CMD ["bunx", "servor", "/app/services/cl/dist/"]
# CMD ["bun", "/app/services/sv/index.ts"]