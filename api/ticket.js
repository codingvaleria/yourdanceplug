class Ticket {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
  }

  createTicket() {
    const newTicket = {
      id: this.id,
      user: this.user,
      event: this.event,
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
