import userCRUD from './user';
import calorieCRUD from './calorie';
import distanceCRUD from './distance';
import watchCRUD from './watch';

const Api = {
  init: (router) => {
    // handle calorie-related API routes
    router.post('/api/v1/user', (ctx, next) => {
        ctx.body = userCRUD.create(ctx.request.body);
      })
      .post('/api/v1/user/login', (ctx, next) => {
        ctx.body = userCRUD.createSession(ctx.request.body);
      })
      .post('/api/v1/user/validate', (ctx, next) => {
        ctx.body = userCRUD.extendSession(ctx.request.body);
      })

    // handle calorie-related API routes
    router.post('/api/v1/caloriesburned', (ctx, next) => {
        ctx.body = calorieCRUD.create(ctx.request.body);
      })
      .get('/api/v1/caloriesburned', (ctx, next) => {
        ctx.body = calorieCRUD.read(-1, true);
      })
      .get('/api/v1/caloriesburned/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = calorieCRUD.read(id);
      })
      .put('/api/v1/caloriesburned/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = calorieCRUD.update(id, ctx.request.body);
      })
      .del('/api/v1/caloriesburned/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = calorieCRUD.destroy(id);
      });

    // handle distance-related API routes
    router.post('/api/v1/distance', (ctx, next) => {
        ctx.body = distanceCRUD.create(ctx.request.body);
      })
      .get('/api/v1/distance', (ctx, next) => {
        ctx.body = distanceCRUD.read(-1, true);
      })
      .get('/api/v1/distance/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = distanceCRUD.read(id);
      })
      .put('/api/v1/distance/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = distanceCRUD.update(id, ctx.request.body);
      })
      .del('/api/v1/distance/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = distanceCRUD.destroy(id);
      });

    // handle watch-related API routes
    router.post('/api/v1/streamusage', (ctx, next) => {
        ctx.body = watchCRUD.create(ctx.request.body);
      })
      .get('/api/v1/streamusage', (ctx, next) => {
        ctx.body = watchCRUD.read(-1, true);
      })
      .get('/api/v1/streamusage/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = watchCRUD.read(id);
      })
      .put('/api/v1/streamusage/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = watchCRUD.update(id, ctx.request.body);
      })
      .del('/api/v1/streamusage/:id', (ctx, next) => {
        const id = parseInt(ctx.params.id)
        ctx.body = watchCRUD.destroy(id);
      });
  }
};

export default Api;
export { Api };
