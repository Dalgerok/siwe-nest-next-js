Firslty run `npm i` in both directories. Then run backend with `npm run build && npm run start` (running on port 3001) and frontend with `npm run build && npm run start` (port 3000).

Few outlines about bonus points and beyond:
1. eslint - done as it's included by default in both nestjs and nextjs
2. I used localStorage instead of cookies, I hope this is a better solution; replay attacks - nonce in siwe (implemented)
3. fp-ts - chatgpt doing pretty good at transforming code, but I'm not into functional code so decided to not include it
4. Redis could be used for sessions - https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210 (not implemented)
And of course I should have written some docker-compose to make the solution containerized.
