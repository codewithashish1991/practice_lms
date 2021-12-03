#!/bin/sh -eux

HOST=username@host
REMOTE_DIR=/home/ashish
DBBACKUP_DIR=/home/ashish/dbbackups
GIT_ROOT=$(git rev-parse --show-toplevel)

remoteDockerCompose () {
    ssh "$HOST" -t -- "cd ${REMOTE_DIR} && docker-compose $@"
}

remoteDockerDB () {
    ssh "$HOST" -t -- "cd ${DBBACKUP_DIR} && docker $@ > db_latest.sql"
}

rsync -c "${GIT_ROOT}/docker-compose.yml" "$HOST:$REMOTE_DIR"
ssh "$HOST" -t -- "cd ${REMOTE_DIR} && chmod +x -R ${DBBACKUP_DIR}"
remoteDockerDB exec -t ashish_postgres_1 pg_dumpall -c -U root
remoteDockerCompose pull
remoteDockerCompose pull
remoteDockerCompose up -d --remove-orphans --force-recreate
remoteDockerCompose ps
echo "restoring database"
ssh "$HOST" -t -- "cd ${DBBACKUP_DIR} && cat db_latest.sql | docker exec -i ashish_postgres_1 psql -U root -d db_lms"
echo "restored"
