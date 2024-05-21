FROM node:latest


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --home /home/nextjs nextjs

WORKDIR /home/nextjs

USER nextjs

COPY --chown=nextjs:nodejs src ./src
COPY --chown=nextjs:nodejs package.json ./

RUN npm install
ENV NODE_ENV production

CMD ["npm", "run", "serve"]
