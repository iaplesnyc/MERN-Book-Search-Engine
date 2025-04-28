import User from '../models/User.js';
import { signToken } from '../services/auth.js';

// ✅ Define custom AuthenticationError manually
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const resolvers = {
  Query: {
    // Get the current user based on the token
    me: async (_parent: any, _args: any, context: any) => { // ✅ renamed to _parent, _args
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    // Log in a user and return Auth token + user data
    login: async (_parent: any, { email, password }: any) => { // ✅ renamed _parent
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Create a new user and return Auth token + user data
    addUser: async (_parent: any, { username, email, password }: any) => { // ✅ renamed _parent
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Save a book to the user's savedBooks array
    saveBook: async (_parent: any, { bookData }: any, context: any) => { // ✅ renamed _parent
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Remove a book from the user's savedBooks array
    removeBook: async (_parent: any, { bookId }: any, context: any) => { // ✅ renamed _parent
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
