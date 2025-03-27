import { setupTest } from 'ember-vite-mirage/tests/helpers';
import { module, test } from 'qunit';
import { setupMirage } from '../helpers/setup-mirage';

module('Unit | Mirage | smoke-tests', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it sets up the route-handlers, models, factories', async function (assert) {
    let mirageUser = this.server.create('user', { name: 'Chris' });
    let mirageComment = this.server.create('comment', {
      text: 'test comment',
      user: mirageUser,
    });

    let store = this.owner.lookup('service:store');
    let user = await store.findRecord('user', mirageUser.id);
    assert.strictEqual(user.name, mirageUser.name);
  });
});
