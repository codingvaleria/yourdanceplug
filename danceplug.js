class InMemoryDatabase {
  constructor() {
    this.tables = {};
    this.lastIds = {};
  }

  select(tableName) {
    if (this.tables[tableName]) {
      return this.tables[tableName];
    } else {
      return [];
    }
  }

  selectById(tableName, id) {
    const table = this.tables[tableName];
    if (table) {
      return table.find((entry) => entry.id === id) || null;
    } else {
      return null;
    }
  }

  update(tableName, id, data) {
    const table = this.tables[tableName];
    if (table) {
      const entry = table.find((entry) => entry.id === id);
      if (entry) {
        Object.assign(entry, data);
        return true;
      }
    }
    return false;
  }

  insert(tableName, data) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
      this.lastIds[tableName] = 0;
    }
    const nextId = this.lastIds[tableName] + 1;
    const entry = { id: nextId, ...data };
    this.tables[tableName].push(entry);
    this.lastIds[tableName] = nextId;
    return nextId;
  }
}

const db = new InMemoryDatabase();

class Ticket {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.ticketNumber = obj.ticketNumber;
    this.payment = obj.payment;
  }
}
class User {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.tickets = [];
  }

  addUser() {
    const existingUser = this.db.selectById("users", this.id);

    if (existingUser) {
      const updatedUserData = {
        id: this.id,
        username: this.username,
        password: this.password,
        tickets: this.tickets,
      };
      this.db.update("users", this.id, updatedUserData);
    } else {
      const newUser = {
        id: this.id,
        username: this.username,
        password: this.password,
        tickets: this.tickets,
      };
      this.db.insert("users", newUser);
    }
  }

  purchaseTicket(obj) {
    const ticket = new Ticket(db, obj);
    this.tickets.push(ticket);
    return ticket;
  }
}

let user1 = new User(db, {
  id: 1,
  username: "user1",
  password: "user123",
});

console.log(user1);
let object1 = {
  id: 5,
  user: "user1",
  event: "event1",
};
console.log(user1.purchaseTicket(object1));

// class Event {
//   constructor(obj) {
//     this.id = obj.id;
//     this.eventname = obj.eventname;
//     this.location = obj.location;
//     this.category = obj.category;
//     this.poster = obj.poster;
//     this.description = obj.description;
//     this.eventdate = obj.eventdate;
//     this.ticketsavailable = obj.ticketsavailable;
//     this.ticketprice = obj.ticketprice;
//     this.tickets = [];
//   }
// }

// class Payment {
//   constructor(obj) {
//     this.id = obj.id;
//     this.user = obj.user;
//     this.event = obj.event;
//     this.amount = obj.amount;
//     this.timestamp = obj.timestamp;
//   }
// }
