class User {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.tickets = [];
  }

  addUser() {
    const existingUser = this.db.selectById("users", this.id);

    if (existingUser) {
      const updatedUserData = {
        id: this.id,
        username: this.username,
        password: this.password,
        tickets: this.tickets,
      };
      this.db.update("users", this.id, updatedUserData);
    } else {
      const newUser = {
        id: this.id,
        username: this.username,
        password: this.password,
        tickets: this.tickets,
      };
      this.db.insert("users", newUser);
    }
  }

  updateUser() {
    const updatedUserData = {
      id: this.id,
      username: this.username,
      password: this.password,
      tickets: this.tickets,
    };
    this.db.update("users", this.id, updatedUserData);
  }

  purchaseTicket(obj) {
    const ticket = new Ticket(db, obj);
    this.tickets.push(ticket);
    this.updateUser();
    return ticket;
  }

  login(password) {
    if (this.password === password) {
      return true;
    } else {
      return "invalid password";
    }
  }

  changePassword(newPassword) {
    this.password = newPassword;
    this.updateUser();
  }
}
// Create User
let user1 = new User(db, {
  id: 1,
  username: "user1",
  password: "user123",
});

console.log(user1);
let object1 = {
  id: 5,
  user: "user1",
  event: "event1",
};
console.log(user1.purchaseTicket(object1));
user1.username = "valeria";
console.log(user1);

console.log(user1.login("dffg"));
user1.changePassword("hdjks");
console.log(user1);
