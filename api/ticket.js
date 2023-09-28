import { Event, event1 } from "./event.js";
import { User, user1 } from "./user.js";
import db from "./db.js";

class Ticket {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.ticketNumber = obj.ticketNumber;
  }

  static purchaseTicket(db, userId, eventId, ticketNumber) {
    const event = db.selectById("events", eventId);

    if (event.ticketsAvailable > 0) {
      const newTicket = {
        user: userId,
        event: eventId,
        ticketNumber: ticketNumber,
      };

      const ticketId = db.insert("tickets", newTicket);
      event.tickets.push(ticketId);
      event.ticketsAvailable -= 1;
      db.update("events", eventId, {
        ticketsAvailable: event.ticketsAvailable,
      });

      const createdTicket = db.selectById("tickets", ticketId);
      return new Ticket(db, createdTicket);
    } else {
      return "False";
    }
  }

  viewTicket() {
    return this.db.selectById("tickets", this.id);
  }

  getTicketsByUserId() {
    return this.db
      .select("tickets")
      .filter((ticket) => ticket.user === this.id);
  }

  getTicketsByEventId() {
    return this.db
      .select("tickets")
      .filter((ticket) => ticket.event === eventId);
  }
}

// Create an instance of Ticket for testing
const ticketData = {
  id: 1,
  user: user1.id,
  event: event1.id,
  ticketNumber: "T12345",
};

const ticketData2 = {
  id: 2,
  user: user1.id,
  event: 2,
  ticketNumber: "T54321",
};

const ticket1 = new Ticket(db, ticketData);
const ticket2 = new Ticket(db, ticketData2);




// //View the created ticket
// console.log("View Ticket:", ticket1.viewTicket());

const event1Tickets = ticket1.getTicketsByEventId(event1.id);
console.log("Tickets for event1:", event1Tickets);

export default Ticket;
