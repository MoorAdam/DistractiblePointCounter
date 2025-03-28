# Use official Node.js image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy the rest of the backend code
COPY . .

# Compile TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Start the backend using compiled JavaScript
CMD ["node", "comp/index.js"]
