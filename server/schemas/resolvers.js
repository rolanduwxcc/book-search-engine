const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {


        users: async () => {
            return User.find().populate('savedBooks');
        },

        user: async (parent, { username }) => {
            const params = username ? { username } : {};
            return User.findOne(params).populate('savedBooks');
        },

        helloWorld: () => {
            return 'Hello World!';
        },

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            console.log('wlr---signup user');
            const token = signToken(user);
            console.log('wlr---aftersign token',token);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            console.log('WLR----login mutate server');
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            console.log("WLR---", user);
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken({ username: user });
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const book = await Book.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book._id } },
                    { new: true }
                );
                return User;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
                return thought;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    }
};

module.exports = resolvers;