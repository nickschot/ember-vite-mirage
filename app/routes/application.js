import Route from '@ember/routing/route';
import { isDevelopingApp, macroCondition } from '@embroider/macros';
import { service } from '@ember/service';
import config from '../config/environment';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    if (macroCondition(isDevelopingApp())) {
      if (config.useMirage) {
        let { makeServer } = await import('../mirage/servers/default');
        let server = await makeServer(
          {
            environment: 'development',
            scenarios: await import('../mirage/scenarios'),
          },
          this.store,
        );
        server.logging = true;
      }
    }
  }

  async model() {
    return this.store.query('user', {
      include: 'comments',
    });
  }
}
