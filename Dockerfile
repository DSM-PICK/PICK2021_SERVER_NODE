FROM node:16.13.1
COPY ./dist /dist
CMD ["npm", "run", "start:prod"]
