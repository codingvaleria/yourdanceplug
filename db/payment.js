class Payment {
  constructor(db, obj) {
    this.db = db;
    this.id = obj.id;
    this.user = obj.user;
    this.event = obj.event;
    this.amount = obj.amount;
    this.timestamp = obj.timestamp;
  }

  createPayment() {
    const newPayment = {
      id: this.id,
      user: this.user,
      event: this.event,
      amount: this.amount,
      timestamp: this.timestamp,
    };

    this.db.insert("payments", newPayment);
  }

  viewPayment() {
    return this.db.selectById("payments", this.id);
  }
}
// Create Payment
const paymentData = {
  id: 1,
  user: "user1",
  event: "event1",
  amount: 50,
  timestamp: Date.now(),
};
const payment = new Payment(db, paymentData);
// console.log(payment);

// Creating and booking a ticket
// const ticketData = {
//   id: 1,
//   user: "user1",
//   event: "event1",
//   ticketNumber: "A123",
//   payment: payment.id,
// };git stati
const ticket = new Ticket(db, ticketData);
const bookingResult = ticket.getTicket(payment.id);

if (bookingResult === "No tickets available.") {
  console.log("Booking failed: No tickets available.");
} else {
  console.log("Ticket booked successfully:", bookingResult);
}
