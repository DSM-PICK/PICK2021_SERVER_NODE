FROM node:17
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
