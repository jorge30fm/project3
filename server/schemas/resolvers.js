import { User, Campsite } from "../models/index.js";
import { AuthenticationError } from "apollo-server-express";
import { signToken } from "../utils/auth.js";

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate("reservationHistory")
					.populate("campsiteListing")
					.populate("userReviews");
				return userData;
			}
			throw new AuthenticationError("Not logged in");
		},
		users: async () => {
			return User.find()
				.select("-__v -password")
				.populate("reservationHistory")
				.populate("campsiteListing")
				.populate("userReviews");
		},
		user: async (parent, { username }) => {
			return User.findOne({ username })
				.select("-__v -password")
				.populate("userReviews")
				.populate("campsiteListing");
		},
		campsites: async (parent, { location, name, _id }) => {
			const params = location ? { location } : name ? { name } : _id ? { _id } : {}
			return Campsite.find(params)
      .populate("campsiteReviews");
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);
			return { token, user };
		},
		addCampsite: async (parent, args) => {
			const campsite = await Campsite.create(args);
			return campsite;
		},
	},
};

export default resolvers;
