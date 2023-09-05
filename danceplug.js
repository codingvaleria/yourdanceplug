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

class Event {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.eventname = obj.eventname;
    this.location = obj.location;
    this.category = obj.category;
    this.poster = obj.poster;
    this.description = obj.description;
    this.eventdate = obj.eventdate;
    this.ticketsavailable = obj.ticketsavailable;
    this.ticketprice = obj.ticketprice;
    this.tickets = [];
  }

  createEvent() {
    const newEvent = {
      id: this.id,
      eventname: this.eventname,
      location: this.location,
      category: this.category,
      poster: this.poster,
      description: this.description,
      eventdate: this.eventdate,
      ticketsavailable: this.ticketsavailable,
      ticketprice: this.ticketprice,
      tickets: [],
    };

    this.db.insert("events", newEvent);
  }

  updateEvent(updatedData) {
    const existingEvent = this.db.selectById("events", this.id);

    if (existingEvent) {
      const updatedEvent = { ...existingEvent, ...updatedData };
      this.db.update("events", this.id, updatedEvent);
    }
  }

  viewEvent() {
    return this.db.selectById("events", this.id);
  }

  deleteEvent() {
    this.db.delete("events", this.id);
  }
}
// Create Event
let event1 = new Event(db, {
  id: 1,
  eventname: "event1",
  location: "location1",
  category: "social",
  poster: "event1poster",
  description: "event1description",
  eventdate: "event1date",
  ticketsavailable: "ticketsavailable",
  ticketprice: "ticket1price",
  tickets: [],
});

console.log(event1);

class Ticket {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.ticketNumber = obj.ticketNumber; //how do I let the system to generate ticket numbers on its own?
    this.payment = obj.payment;
  }

  createTicket() {
    const newTicket = {
      id: this.id,
      user: this.user,
      event: this.event,
      ticketNumber: this.ticketNumber,
      payment: this.payment,
    };

    this.db.insert("tickets", newTicket);
  }

  viewTicket() {
    return this.db.selectById("tickets", this.id);
  }

  getTicket(payment) {
    if (this.ticketsavailable > 0) {
      const newTicket = {
        id: this.id,
        user: this.user,
        event: this.event,
        ticketNumber: this.ticketNumber,
        payment: payment,
      };

      this.db.insert("tickets", newTicket);
      this.ticketsavailable -= 1;
      this.db.update("events", this.event, {
        ticketsavailable: this.ticketsavailable,
      });
      return newTicket;
    } else {
      return "No tickets available.";
    }
  }
}

//Create a ticket
const ticketData = {
  id: 1,
  user: "user1",
  event: event1.id,
  ticketNumber: "A123",
  payment: null,
};

const ticket1 = new Ticket(db, ticketData);

ticket1.createTicket();

const createdTicket = ticket1.viewTicket();

console.log("Created Ticket:", createdTicket);

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

  updateUser() {
    const updatedUserData = {
      id: this.id,
      username: this.username,
      password: this.password,
      tickets: this.tickets,
    };
    this.db.update("users", this.id, updatedUserData);
  }

  purchaseTicket(obj) {
    const ticket = new Ticket(db, obj);
    this.tickets.push(ticket);
    this.updateUser();
    return ticket;
  }

  login(password) {
    if (this.password === password) {
      return true;
    } else {
      return "invalid password";
    }
  }

  changePassword(newPassword) {
    this.password = newPassword;
    this.updateUser();
  }
}
// Create User
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
user1.username = "valeria";
console.log(user1);

console.log(user1.login("dffg"));
user1.changePassword("hdjks");
console.log(user1);

class Payment {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.amount = obj.amount;
    this.timestamp = obj.timestamp;
  }

  createPayment() {
    const newPayment = {
      id: this.id,
      user: this.user,
      event: this.event,
      amount: this.amount,
      timestamp: this.timestamp,
    };

    this.db.insert("payments", newPayment);
  }

  viewPayment() {
    return this.db.selectById("payments", this.id);
  }
}
// Create Payment
const paymentData = {
  id: 1,
  user: "user1",
  event: "event1",
  amount: 50,
  timestamp: Date.now(),
};
const payment = new Payment(db, paymentData);
// console.log(payment);

// Creating and booking a ticket
// const ticketData = {
//   id: 1,
//   user: "user1",
//   event: "event1",
//   ticketNumber: "A123",
//   payment: payment.id,
// };
const ticket = new Ticket(db, ticketData);
const bookingResult = ticket.getTicket(payment.id);

if (bookingResult === "No tickets available.") {
  console.log("Booking failed: No tickets available.");
} else {
  console.log("Ticket booked successfully:", bookingResult);
}
