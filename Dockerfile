# Use an official Node.js runtime as the base image
FROM node:latest
  
  # Set the working directory inside the container
WORKDIR /app
  
  # Copy package.json and package-lock.json to the container
COPY package.json ./
COPY yarn.lock ./
  
  # Install application dependencies
RUN yarn install
  
  # Copy the rest of the application source code to the container
COPY . .
  
  # Expose the application's port
EXPOSE 8080
  
  # Start the applicationcl
CMD [ "npm", "run", "start:dev" ]