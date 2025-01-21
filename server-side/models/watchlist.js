import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FounderPost' }],
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
