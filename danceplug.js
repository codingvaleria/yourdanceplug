class User {
  constructor(obj) {
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.tickets = [];
  }
}

class Event {
  constructor(obj) {
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
}

class Ticket {
  constructor(obj) {
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.ticketNumber = obj.ticketNumber;
    this.payment = obj.payment;
  }
}

class Payment {
  constructor(obj) {
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.amount = obj.amount;
    this.timestamp = obj.timestamp;
  }
}
