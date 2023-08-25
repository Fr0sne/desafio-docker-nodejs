const http = require("http")
const mysql = require("mysql2")
const { faker } = require("@faker-js/faker")


var connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'd3safio-n0d3js',
  database: 'desafio-nodejs-db'
});

connection.connect()

const app = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    connection.query("SELECT * FROM people", async (err, rows, fields) => {
      const names = rows.map(i => i.nome);
      const randomName = faker.person.firstName();
      const randomNameLI = `<li>${randomName}</li>`
      const storedNamesLIs = names.map(i => `<li>${i}</li>`).join("\n")
      connection.query(`INSERT INTO people VALUES ('${randomName}')`)
      return response.end(`
        <h1>Full Cycle Rocks!!</h1>
        ${randomNameLI}
        ${storedNamesLIs}
      `)
    })
  }
})

app.listen(3000)