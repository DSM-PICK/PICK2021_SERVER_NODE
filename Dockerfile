FROM arm64v8/node:17-alpine
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "run", "start:prod"]
