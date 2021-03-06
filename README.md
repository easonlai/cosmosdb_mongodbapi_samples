# Microsoft Azure Cosmos DB (MongoDB API) Samples

This is a sample code repository for demonstrating how to interact with [Microsoft Azure Cosmos DB (MongoDB API)](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb/mongodb-introduction).

**Python**

Sample notebook perform CRUD (CREATE, READ, UPDATE, DELETE) operations with Azure Cosmos DB (MongoDB API).
* /python/sample_1.ipynb

**NodeJS**

Sample website run on NodeJS (ExpressJS) to perform CRUD (CREATE, READ, UPDATE, DELETE) operations with Azure Cosmos DB (MongoDB API).
* /nodejs/server.js
    * npm run dev <-- Dev Debug
    * node ./server.js

Sample API run on NodeJS (ExpressJS) to perform CRUD (CREATE, READ, UPDATE, DELETE) operations with Azure Cosmos DB (MongoDB API).
* /nodejs/apiserver.js
    * npm run dev <-- Dev Debug
    * node ./apiserver.js
    * CREATE = /createproduct (POST); UPDATE = /updateproduct (POST); READ = /productlist (GET); DELETE = /deleteproduct (POST)

Enjoy!