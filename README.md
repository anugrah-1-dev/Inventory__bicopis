## Setup Docker Compose
[Download compose](https://drive.google.com/file/d/1zTBKrcPhxKD2npFFgXwJ4Gj25g0ryW-Q/view?usp=sharing)

`docker-compose up -d`
## Migrate Database
`docker exec -it nama-container-app bash`

`php artisan migrate`
