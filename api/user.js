import db from "./db.js";
class User {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
  }

  static saveUser(db, obj) {
    let id = db.insert("users", {
      username: obj.username,
      password: obj.password,
    });
    return new User(db, { id, ...obj });
  }

  updateUser(data) {
    let isUpdated = this.db.update("users", this.id, data);
    if (isUpdated === true) {
      return User.getUser(this.db, this.id);
    } else {
      return null;
    }
  }

  static getUser(db, id) {
    let userObj = db.selectById("users", id);
    let user = new User(db, userObj);
    return user;
  }

  getUserTickets() {
    return this.db
      .select("tickets")
      .filter((ticket) => ticket.user === this.id);
  }

  static findAll(db) {
    let userObjects = db.select("users");
    return userObjects.map((userObj) => new User(db, userObj));
  }

  login(password) {
    if (this.password === password) {
      return true;
    } else {
      return false;
    }
  }

  logout() {}

  getUserBookedEvents() {
    const userTickets = this.db
      .select("tickets")
      .filter((ticket) => ticket.user === this.id);
    const bookedEventIds = userTickets.map((ticket) => ticket.event);
    return this.db
      .select("events")
      .filter((event) => bookedEventIds.includes(event.id));
  }
}

// Create user
const user1 = User.saveUser(db, {
  username: "User1",
  password: "user123",
});

// console.log("Created User:", user1);

const user2 = User.saveUser(db, {
  username: "User2",
  password: "user234",
});
// console.log("Created User:", user2);

// Find all users
const allUsers = User.findAll(db);
// console.log("All USers:", allUsers)

// Get a user by ID
const userId = 2;
const foundUSer = User.getUser(db, userId);
// console.log("Found User:", foundUSer)

// Update User
const updateUserData = {
  username: "Valeria",
};
const updatedUser = foundUSer.updateUser(updateUserData);
// console.log("Updated User:", updatedUser)

// Get user's booked events
const userBookedEvents = foundUSer.getUserBookedEvents();
console.log("Booked Events:", userBookedEvents);

export default { User, user1 };
