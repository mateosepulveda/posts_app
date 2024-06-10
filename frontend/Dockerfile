# Use the official Node.js 20 image as base
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Remove the existing node_modules directory (just in case)
RUN rm -rf node_modules

# Install dependencies
RUN npm install

# Copy the rest of the frontend files to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "start"]