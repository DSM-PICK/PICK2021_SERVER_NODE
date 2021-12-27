FROM node:16.13.1
COPY ./dist /dist
CMD [ "node", "dist/main" ]
