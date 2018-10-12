const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// -1 -> Account is Blocked
// 0 -> Account Not Active
// 1 -> Account is Active

const user = new schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    email: {
      type: Boolean,
      default: false
    }
  },
  code: {
    email: String,
  },
  loyalty: {
    card: Number,
    points: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: Number,
    default: 0
  },
  logs: {
    login: [Date],
    logout: [Date]
  }
});

module.exports = mongoose.model('user', user);