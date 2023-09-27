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

  changePassword(newPassword) {
    this.password = newPassword;
    this.updateUser(this.password);
  }

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
// Create User
let user1 = new User(db, {
  username: "user1",
  password: "user123",
});

console.log(user1);

// // console.log(user1.updateUser({ password: "fgh" }));
// // console.log(user1);

// let user2 = new User(db, {
//   username: "user2",
//   password: "user234",
// });
// user2.saveUser();
// // // console.log(user2);
// console.log(User.findAll(db));
// // console.log(User.getUser(db, 1))

// // // console.log(user1);

// // // console.log(user1.login("dffg"));
// // // user1.changePassword("hdjks");
// // // console.log(user1);
