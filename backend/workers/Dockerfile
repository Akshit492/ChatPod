# Use the official Node.js image
FROM node:14

# Create and change to the worker directory
WORKDIR /usr/src/worker

# Install dependencies
COPY package*.json ../
RUN npm install

# Copy the rest of the worker code
COPY . .

# Run the worker
CMD ["node", "bullmqWorker.js"]
