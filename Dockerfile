# get image (see playwright docu)
FROM mcr.microsoft.com/playwright:v1.60.0-noble

# create an folder for all the files
RUN mkdir /app
WORKDIR /app

# get all files from source and move it to app
COPY . /app

# install all dependencies
RUN npm install --force

# intall all browsers
RUN npx playwright install
