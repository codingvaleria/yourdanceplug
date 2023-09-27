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

  static saveEvent(db, obj) {
    const newEvent = {
      eventName: obj.eventName,
      location: obj.location,
      category: obj.category,
      poster: obj.poster,
      description: obj.description,
      eventDate: obj.eventDate,
      ticketsAvailable: obj.ticketsAvailable,
      ticketPrice: obj.ticketPrice,
      tickets: [],
    };

    let id = db.insert("events", newEvent);
    return new Event(db, { id, ...obj });
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

  static viewEvent(db, id) {
    let eventObj = db.selectById("events", id);
    let event = new Event(db, eventObj);
    return event;
  }

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

let event2 = new Event(db, {
  id: 2,
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
event2.saveEvent();
// console.log("Event Saved:", event1);

// // View event properties
// console.log("\nTesting Event Methods:");
// console.log("Event ID:", event1.id);
// console.log("Event Name:", event1.eventName);
// console.log("Event Location:", event1.location);
// console.log("Event Category:", event1.category);

// // Update event
// const updatedEventData = {
//   eventName: "AfroSoul Connection",
//   location: "Movenpic Hotel & Residences",
// };
// event1.updateEvent(updatedEventData);
// console.log("Updated Event:", event1);

// //Find all events
// const allEvents = Event.findAllEvents(db);
// // console.log("All Events:", allEvents);

// View event tickets
const eventTickets = event1.viewEventTickets();
console.log("Event Tickets:", eventTickets);

// View event
// const viewedEvent = Event.viewEvent(db, event2.id);
// console.log("Viewed Event:", viewedEvent);

// // Delete Event
// event2.deleteEvent();

// export { Event, event1 };
