module.exports = {
  client: {
    include: ['./src/**/*.{ts,tsx}'],
    tagName: 'gql',
    service: {
      name: 'juber-eats-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
