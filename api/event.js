import db from "./db.js";
import { User, user1 } from "./user.js";
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

  getEventsByUserId() {
    const userTickets = this.db
      .select("tickets")
      .filter((ticket) => ticket.user === this.id);
    const bookedEventIds = userTickets.map((ticket) => ticket.event);
    return this.db
      .select("events")
      .filter((event) => bookedEventIds.includes(event.id));
  }

  static getEvent(db, id) {
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
let event1 = Event.saveEvent(db, {
  eventName: "event1",
  location: "location1",
  category: "social",
  poster: "event1poster",
  description: "event1description",
  eventDate: "event1date",
  ticketsAvailable: 100,
  ticketPrice: "ticket1price",
});

let event2 = Event.saveEvent(db, {
  eventName: "event2",
  location: "location2",
  category: "social",
  poster: "event2poster",
  description: "event2description",
  eventDate: "event2date",
  ticketsAvailable: 80,
  ticketPrice: "ticket2price",
});

// console.log("Event Saved:", event1);

// Update event
const updatedEvent = event1.updateEvent({ eventName: "Afrosoul Connection" });
// console.log(updatedEvent);

// Find all events
const allEvents = Event.findAllEvents(db);
console.log("All Events:", allEvents);

// Get event
const eventId = 2;
const foundEvent = Event.getEvent(db, eventId);
// console.log("Found Event:", foundEvent);

// // Delete Event
// event2.deleteEvent();

export { Event, event1 };
