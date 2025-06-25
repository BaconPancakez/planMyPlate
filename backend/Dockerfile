# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy everything into container
COPY . .

# Install dependencies
RUN npm install

# Expose port (Cloud Run default)
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
