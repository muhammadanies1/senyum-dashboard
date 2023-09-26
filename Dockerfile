FROM node:18.12.1

# copy all files to docker image
COPY . /app

# directory position
WORKDIR /app

# install dependencies
RUN npm install -f

# Building app
RUN npm run build
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y -q install tzdata && \
    apt -y autoremove && \
    rm -rf /var/lib/apt/lists/*

ENV TZ=Asia/Jakarta


# Running the app
CMD ["npm", "start"]