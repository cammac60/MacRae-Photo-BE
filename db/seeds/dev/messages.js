
exports.seed = async (knex) => {
  return knex('messages').del()
    .then(() => {
      return knex('messages').insert([
        {email: 'test@test.test', body: 'This is a test'}
      ]);
    });
};
