import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import cors from 'kcors';
import React from 'react';
import colors from 'colors';
import ip from 'my-local-ip';
import serve from 'koa-static';
import App from '../shared/App';
import Api from './crud/api.js';
import Router from 'koa-router';
import fetch from 'isomorphic-fetch';
import bodyParser from 'koa-bodyparser';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

const port = 5000;
const app = new Koa();
const router = new Router();
const filepath = path.resolve('src', 'public', 'index.html');
const template = fs.readFileSync(filepath).toString();

// initial setup
app.use(cors());
app.use(bodyParser());
app.use(serve('build'));

// setup API
Api.init(router);

// map all remaining routes to front-end application
let last = new Date();
let routeData;
let routes = [];

router.get('*', async (ctx, next) => {
  const now = new Date();

  const activeRoute = routes.find(route=>matchPath(ctx.req.url,route))||{};

  const markup = renderToString(
    <StaticRouter location={ctx.req.url} context={{ routeData }}>
      <App routes={routeData} />
    </StaticRouter>
  );

  const result = template.replace(
    `<div id="root"></div>`,
    `
    <script>
      window.__DATA_LOADED__ = true;
    </script>
    <div id="root">${markup}</div>
    `
  );

  ctx.body = result;
});

// start server loop
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);

console.log(
  colors.bold.white(`Server current listening :\n\n`) +
  colors.reset.yellow(`Machine access: https://localhost:${port}\n`) +
  colors.reset.yellow(`Network access: https://${ip()}:${port}`)
);
