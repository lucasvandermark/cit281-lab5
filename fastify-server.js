// Require the Fastify framework and instantiate it
const fastify = require("fastify")({
    logger: false,
    });
   
const students = [
        {
          id: 1,
          last: "Last1",
          first: "First1",
        },
        {
          id: 2,
          last: "Last2",
          first: "First2",
        },
        {
          id: 3,
          last: "Last3",
          first: "First3",
        }
];

    // Note use of "chain" dot notation syntax
    fastify.get("/cit/students", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
    });

    fastify.get("/cit/students/:id", (request, reply) => {
        const { id } = request.params;
        let student = null;

        for (const stud of students) {
            if (stud.id === parseInt(id)) {
                student = stud;
            }
        }

        if (student == null) {
            reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send("Student is not found")
        } else {
            reply
                .code(200)
                .header("Content-Type", "application/json; charset=utf-8")
                .send(student)
        }
        });  

    fastify.get("*", (request, reply) => {
        reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send("<h1>Route not found</h1>");
        
        });   
    
    fastify.post("/cit/students", (request, reply) => {
        const { first, last } = request.body

       //Using the spread syntax discussed in class, along with map method to display the max id value. A 1 will then be added to this value to create a new ID 1 number abvoe the current maximum
       const newID = Math.max(...students.map(function(student) {return student.id})) + 1;
      
        const newStudent = {
            id: newID,
            last,
            first
        };

        students.push(newStudent);

        reply
            .code (200) 
            .header("Content-Type", "application/json; charset=utf-8")
            .send(newStudent)
    });

    // Start server and listen to requests using Fastify
    const listenIP = 'localhost';
    const listenPort = 8082;
    fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
    // fastify.log.error(err);
    console.log(err);
    process.exit(1);
    }
    // fastify.log.info(`Server listening on ${address}`);
    console.log(`Server listening on ${address}`);
    });