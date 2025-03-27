export default function (server) {
  let user = server.create('user');
  let comments = server.createList('comment', 5, { user });

  return { user, comments };
}
