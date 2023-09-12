import db from "./db.js";
class User {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
  }

  saveUser() {
    let id = this.db.insert("users", {
      id: this.id,
      username: this.username,
      password: this.password,
    });
    this.id = id;
  }

  updateUser(data) {
    let isUpdated = this.db.update("users", this.id, data);
    if (isUpdated === true) {
      return User.viewUser(this.db, this.id);
    } else {
      return null;
    }
  }

  static viewUser(db, id) {
    let userObj = db.selectById("users", id);
    let user = new User(db, userObj);
    return user;
  }

  static findAll(db) {
    let userObjects = db.select("users");
    let users = [];
    for (let i = 0; i < userObjects.length; i++) {
      let user = new User(db, userObjects[i]);
      users.push(user);
    }
    return users;
  }

  login(password) {
    if (this.password === password) {
      return true;
    } else {
      return "invalid password";
    }
  }

  logout() {}

  changePassword(newPassword) {
    this.password = newPassword;
    this.updateUser(thi.password);
  }
}
// Create User
let user1 = new User(db, {
  id: 1,
  username: "user1",
  password: "user123",
});

// // console.log(user1);
// user1.saveUser();
// // console.log(user1.updateUser({ password: "fgh" }));
// // console.log(user1);

// let user2 = new User(db, {
//   username: "user2",
//   password: "user234",
// });
// user2.saveUser();
// // // console.log(user2);
// console.log(User.findAll(db));
// // console.log(User.viewUser(db, 1))

// // // console.log(user1);

// // // console.log(user1.login("dffg"));
// // // user1.changePassword("hdjks");
// // // console.log(user1);
