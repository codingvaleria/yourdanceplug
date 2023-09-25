import { Event, event1 } from "./event.js";
import db from "./db.js";

class Ticket {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.ticketNumber = obj.ticketNumber;
  }

  createTicket() {
    const newTicket = {
      id: this.id,
      user: this.user,
      event: this.event,
      ticketNumber: this.ticketNumber,
    };

    this.db.insert("tickets", newTicket);

    const event = Event.viewEvent(this.db, this.event);
    event.tickets.push(this.id);
    event.ticketsAvailable -= 1;
    this.db.update("events", this.event, {
      ticketsAvailable: event.ticketsAvailable,
      tickets: event.tickets,
    });
  }

  viewTicket() {
    return this.db.selectById("tickets", this.id);
  }

  getTicket(payment) {
    const event = Event.viewEvent(this.db, this.event);

    if (event.ticketsAvailable > 0) {
      const newTicket = {
        id: this.id,
        user: this.user,
        event: this.event,
        ticketNumber: this.ticketNumber,
        payment: payment,
      };

      this.db.insert("tickets", newTicket);
      event.tickets.push(this.id);
      event.ticketsAvailable -= 1;
      this.db.update("events", this.event, {
        ticketsAvailable: event.ticketsAvailable,
      });
      return newTicket;
    } else {
      return "No tickets available.";
    }
  }
}

// Create an instance of Ticket for testing
const ticketData = {
  id: 1,
  user: "user1",
  event: event1.id,
  ticketNumber: "T12345",
};

const ticket1 = new Ticket(db, ticketData);

// Testing Ticket methods
console.log("Testing Ticket Methods:");
console.log("Ticket ID:", ticket1.id);
console.log("Ticket User:", ticket1.user);
console.log("Ticket Event:", ticket1.event);
console.log("Ticket Ticket Number:", ticket1.ticketNumber);

// Create a ticket
ticket1.createTicket();
console.log("Created ticket:", ticket1);

//View the created ticket
console.log("View Ticket:", ticket1.viewTicket());

export default Ticket;
