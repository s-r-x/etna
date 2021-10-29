FROM elixir:1.12.3
RUN set -xe && \
  apt-get update -y && \
  apt install -y inotify-tools && \
  mix local.hex --force && \
  mix archive.install hex phx_new --force && \
  mix local.rebar --force
WORKDIR /app
CMD ["sh", "-c", "mix deps.get && mix phx.server"]