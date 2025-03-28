# Use official Node.js image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the fronetnd code
COPY . .

# Expose port
EXPOSE 8080

ENV VITE_API_URL=http://backend:3000

# Start the backend using compiled JavaScript
CMD ["npm", "run", "dev"]
