sequelize.models.forEach((model) => {
  model.associate(sequelize.models);
});
