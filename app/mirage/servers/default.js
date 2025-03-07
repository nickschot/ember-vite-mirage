import { createConfig } from 'ember-mirage';
import { importEmberDataModels } from 'ember-mirage/ember-data';
import { getContext } from '@ember/test-helpers';
import { pluralize, singularize } from 'ember-inflector';
import { createServer } from 'miragejs';

const emberDataModels = import.meta.glob('../../models/**/*');
const mirageConfig = await createConfig({
  factories: import.meta.glob('../factories/*'),
  fixtures: import.meta.glob('../fixtures/*'),
  models: import.meta.glob('../models/*'),
  serializers: import.meta.glob('../serializers/*'),
  identityManagers: import.meta.glob('../identity-managers/*'),
});

export function makeServer(config) {
  let { inflector, ...rest } = config;

  let store = getContext().owner.lookup('service:store');
  let server = createServer({
    ...mirageConfig,
    ...rest,

    inflector: {
      pluralize,
      singularize,
      ...inflector,
    },

    models: {
      ...importEmberDataModels(store, emberDataModels),
      ...mirageConfig.models,
      ...config.models,
    },

    serializers: {
      ...mirageConfig.serializers,
      ...config.serializers,
    },

    routes() {
      this.get('users', function (schema) {
        return schema.users.all();
      });
    },
  });

  // This only works after the server was created.
  if (
    typeof location !== 'undefined' &&
    location.search.indexOf('mirageLogging') !== -1
  ) {
    server.logging = true;
  } else {
    server.logging = false;
  }

  return server;
}
