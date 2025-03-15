import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr name;

  @hasMany('comment', { async: false, inverse: 'user' }) comments;
}
