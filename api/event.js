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

    let id = this.db.insert("events", newEvent);
    this.id = id;
  }

  updateEvent(updatedData) {
    let isUpdated = this.db.update("events", this.id, updatedData);
    if (isUpdated === true) {
      return Event.findById(this.db, this.id);
    } else {
      return null;
    }
  }

  static viewEvent(db, id) {
    let eventObj = db.selectById("events", id);
    let event = new Event(db, eventObj);
    return event;
  }

  deleteEvent() {
    this.db.delete("events", this.id);
  }
}
// Create Event
let event1 = new Event(db, {
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
