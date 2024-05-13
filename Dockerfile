FROM golang:1.21.0 as builder
WORKDIR /app

COPY server/go.mod server/go.sum ./

RUN go mod download

COPY server .

RUN CGO_ENABLED=0 GOOS=linux go build -o main ./main.go

FROM python:3.8-slim as final
WORKDIR /app

COPY --from=builder /app/main .

RUN apt-get update
RUN apt-get install -yq apt-utils >/dev/null 2>&1

EXPOSE 5050

CMD ["./main"]
