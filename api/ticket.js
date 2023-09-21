import { event1 } from "./event.js";
import Event from "./event.js";
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

//Create a ticket
const ticketData = {
  id: 1,
  user: "user1",
  event: event1.id,
  ticketNumber: "T12345",
};

const ticket1 = new Ticket(db, ticketData);

ticket1.createTicket();
