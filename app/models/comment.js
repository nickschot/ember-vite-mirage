import Model, { attr, belongsTo } from '@ember-data/model';

export default class CommentModel extends Model {
  @attr text;

  @belongsTo('user', { async: false, inverse: 'comments' }) user;
}
