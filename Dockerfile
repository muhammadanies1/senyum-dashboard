FROM node:18.12.1

# copy all files to docker image
COPY . /app

# directory position
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# install dependencies
RUN npm install -f

# Building app
RUN npm run build
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y -q install tzdata curl && \
    apt -y autoremove && \
    rm -rf /var/lib/apt/lists/*

ENV TZ=Asia/Jakarta

# Expose the port your app runs on (Next.js typically uses port 3000)
EXPOSE 3000

# Running the app
CMD ["npm", "start"]