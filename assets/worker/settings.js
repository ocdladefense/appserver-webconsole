const serverSettings = {

};

const cacheSettings ={

};

const mydb = {
    name: "mydb",
    driver: "DatabaseIndexedDb",
    schema: {
        autoIncrement:"true",
        indexes:[{name:"name",path:"name", options:{ unique:false }},
                 {name:"age",path:"age", options:{ unique: false }},
                 {name:"hairColor",path:"hairColor", options:{ unique: false }}]
    }
};

const customers = {
    name:"customers",
    driver:"DatabaseIndexDb",
    schema: {
        keyPath:"ssn",
        autoIncrement:"false",
        indexes:[{name:"name",path:"name", options:{ unique:false }},
                 {name:"email",path:"email", options:{ unique: true }}]
    }
};

const databaseSettings={
    name: "my-db-v1",
    version:1,
    stores: [mydb, customers]
};
