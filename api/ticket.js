import { event1 } from "./event.js";
import { user1 } from "./user.js";
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
      return false;
    }
  }

  static getTicket(db, ticketId) {
    let ticketObj = db.selectById("tickets", ticketId);
    let ticket = new Ticket(db, ticketObj);
    return ticket;
  }

  static getTicketsByUserId(db, userId) {
    return db.select("tickets").filter((ticket) => ticket.user === userId);
  }

  static getTicketsByEventId(db, eventId) {
    return db.select("tickets").filter((ticket) => ticket.event === eventId);
  }
}

export default Ticket;

// Purchase Ticket
const purchasedTicket = Ticket.purchaseTicket(db, user1.id, event1.id, "T1234");
// console.log("Purchased Ticket:", purchasedTicket);

// View Ticket
let gottenTicket = Ticket.getTicket(db, purchasedTicket.id);
// console.log("Viewed Ticket:", gottenTicket);

// Get Tickets by userId
const userTicket = Ticket.getTicketsByUserId(db, user1.id);
// console.log("User Ticket:", userTicket);

// Get Tickets by eventId
const ticketForEvent = Ticket.getTicketsByEventId(db, event1.id)
console.log("Event Ticket:", eventTicket);