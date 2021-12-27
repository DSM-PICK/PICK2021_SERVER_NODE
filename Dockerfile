FROM node:16.13.1
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
