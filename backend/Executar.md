# Comandos iniciais
  - docker start database // inicia o banco de dados da aplicação
  - docker start mongobarber // inicia o banco não relacional para controle de agendamentos

  - yarn dev // rodar a aplicação
  - yarn queue // tratar as filas de cancelamento e envio de e-mail

# Acessos externos
  - mailtrap.io // servidor de e-mail para testes de envio de e-mail para cancelamentos
  - sentry.io // Usado para receber relatório dos erros da aplicação

# Aplicatiovos para visualizar banco de dados
  - Postbird // visualiza o banco de dados de modo geral
  - MongoDB Compas // visualiza o banco de dados dos agendamentos


Dicas de alguns erros:
  - Apagar todos os agendamentos e criar novos por meio de rodar a migrate do zero

# A verificar
  - Não permitir cancelar mais de uma vez o mesmo agendamento


# Criando uma migration
yarn sequelize migration:create --name=create-name

# Executando uma migration
yarn sequelize db:migrate

# Removendo última migration
yarn sequelize db:migrate:undo

# Removendo todas as migrations
yarn sequelize db:migrate:undo:all

# Criando um seed
yarn sequelize seed:create --name=create-name

# Executando as seeds
yarn sequelize db:seed:all

