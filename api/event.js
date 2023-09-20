import db from "./db.js";
class Event {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.eventName = obj.eventName;
    this.location = obj.location;
    this.category = obj.category;
    this.poster = obj.poster;
    this.description = obj.description;
    this.eventDate = obj.eventDate;
    this.ticketsAvailable = obj.ticketsAvailable;
    this.ticketPrice = obj.ticketPrice;
    this.tickets = [];
  }

  saveEvent() {
    const newEvent = {
      eventName: this.eventName,
      location: this.location,
      category: this.category,
      poster: this.poster,
      description: this.description,
      eventDate: this.eventDate,
      ticketsAvailable: this.ticketsAvailable,
      ticketPrice: this.ticketPrice,
      tickets: [],
    };

    let id = this.db.insert("events", newEvent);
    this.id = id;
  }

  updateEvent(updatedData) {
    let isUpdated = this.db.update("events", this.id, updatedData);
    if (isUpdated === true) {
      return Event.viewEvent(this.db, this.id);
    } else {
      return null;
    }
  }

  static viewEvent(db, id) {
    let eventObj = db.selectById("events", id);
    let event = new Event(db, eventObj);
    return event;
  }

  static findAll(db) {
    let eventObjects = db.select("events");
    let events = [];
    for (let i = 0; i < eventObjects.length; i++) {
      let event = new Event(db, eventObjects[i]);
      events.push(event);
    }
    return events;
  }

  deleteEvent() {
    this.db.delete("events", this.id);
  }

  getEventTickets() {
    return this.db
      .select("tickets")
      .filter((ticket) => ticket.event === this.id);
  }
}
// Create Event
let event1 = new Event(db, {
  eventName: "event1",
  location: "location1",
  category: "social",
  poster: "event1poster",
  description: "event1description",
  eventDate: "event1date",
  ticketsAvailable: "ticketsAvailable",
  ticketPrice: "ticket1price",
  tickets: [],
});
event1.saveEvent();

let event2 = new Event(db, {
  eventName: "event1",
  location: "location1",
  category: "social",
  poster: "event1poster",
  description: "event1description",
  eventDate: "event1date",
  ticketsAvailable: "ticketsAvailable",
  ticketPrice: "ticket1price",
  tickets: [],
});
event2.saveEvent();

// // console.log(event1);
// // console.log(event1.saveEvent());
// // console.log(event1.updateEvent({ category: "festival" }));
// event2.deleteEvent();
// console.log(Event.findAll(db));
