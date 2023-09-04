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
    this.date = obj.date;
    this.totalticketavailable = obj.totalticketavailable;
    this.ticketprice = obj.ticketprice;
    this.tickets = [];
  }
}
