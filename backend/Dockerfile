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

# Copy the rest of the backend files to the container
COPY . .

# Expose port
EXPOSE 5000

# Copy wait-for-it.sh into the container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Make wait-for-it.sh executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Once database is available, trigger Prisma migrate, expose port and start backend
CMD ["sh", "-c", "wait-for-it.sh database:5432 -- && npx prisma migrate dev --name init && npm start"]
