const mongoose = require('mongoose');

// Intentional gap: no indexes on assignedTo or status — queries will be slow at scale
// Intentional gap: dueDate stored as String, not Date — no sorting or comparison support
// Intentional gap: no pre-save hook to auto-set timestamps or validate transitions
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // Intentional gap: required is missing — tasks can be created with no title
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Open', 'Claimed', 'Submitted', 'Approved', 'Rejected'],
      // Intentional gap: no default — status is undefined until explicitly set
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Intentional gap: no required — tasks can exist without an assigned talent
    },
    dueDate: {
      // Intentional gap: stored as String instead of Date — breaks date comparisons/sorting
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
