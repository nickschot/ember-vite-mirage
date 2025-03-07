import { setupTest } from 'ember-vite-mirage/tests/helpers';
import { module, test } from 'qunit';
import { setupMirage } from '../helpers/setup-mirage';

async function prepare(context, options = { withUsers: 0 }) {
  let { server, owner } = context;

  if (options.withUsers) {
    server.createList('user', options.withUsers);
  }

  let store = owner.lookup('service:store');

  return {
    store,
    users: await store.findAll('user'),
  };
}

module('Unit | Mirage | smoke-tests', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it sets up the route-handlers, models, factories', async function (assert) {
    let { store, users } = await prepare(this, { withUsers: 2 });

    this.server.create('user', { name: 'My custom name' });

    assert.strictEqual(users.length, 2);

    let queriedUsers = await store.query('user', {});
    assert.strictEqual(queriedUsers.length, 3);
  });
});
