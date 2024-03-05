# E-commerce-Web

## MIGRAR BASE DE DATOS A MYSQL (EJECUTAR EN \E-commerce-Web\MySQL)
```
npx sequelize db:create
npx sequelize db:migrate --name 20240221060002-create-categoria
npx sequelize db:migrate --name 20240221064545-create-cuenta
npx sequelize db:migrate --name 20240221071601-create-orden
npx sequelize db:migrate --name 20240221070216-create-producto
npx sequelize db:migrate --name 20240221065308-create-lista-deseos
npx sequelize db:migrate --name 20240221065442-create-orden-producto
```
