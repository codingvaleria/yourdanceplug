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
      for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key)) {
          this[key] = updatedData[key];
        }
      }
      return this;
    } else {
      return null;
    }
  }

  deleteEvent() {
    this.db.delete("events", this.id);
  }

  viewEventTickets() {
    return this.db
      .select("tickets")
      .filter((ticket) => ticket.event === this.id);
  }

  // Instance-specific method to view an event
  static viewEvent(db, id) {
    let eventObj = db.selectById("events", id);
    let event = new Event(db, eventObj);
    return event;
  }

  // Static method to find all events
  static findAllEvents(db) {
    let eventObjects = db.select("events");
    let events = [];
    for (let i = 0; i < eventObjects.length; i++) {
      let event = new Event(db, eventObjects[i]);
      events.push(event);
    }
    return events;
  }
}

// Testing Event methods
// Create Event
let event1 = new Event(db, {
  id: 100,
  eventName: "event1",
  location: "location1",
  category: "social",
  poster: "event1poster",
  description: "event1description",
  eventDate: "event1date",
  ticketsAvailable: 100,
  ticketPrice: "ticket1price",
  tickets: [],
});

event1.saveEvent();
// console.log("Event Saved:", event1);

// console.log("\nTesting Event Methods:");
// console.log("Event ID:", event1.id);
// console.log("Event Name:", event1.eventName);
// console.log("Event Location:", event1.location);
// console.log("Event Category:", event1.category);

// Update event
const updatedEventData = {
  eventName: "AfroSoul Connection",
  location: "Movenpic Hotel & Residences",
};
event1.updateEvent(updatedEventData);
console.log("Updated Event:", event1);

// const eventTickets = event1.viewEventTickets();
// console.log("Event Tickets:", eventTickets);

export { Event, event1 };
