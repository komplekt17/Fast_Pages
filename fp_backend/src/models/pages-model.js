import { Schema, model } from 'mongoose';

const pageSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		link: {
			type: String,
			required: true,
			trim: true,
		},
		ctgrId: {
			type: String,
			required: true,
		},
		ctgrClass: {
			type: String,
		},
		ctgrColor: {
			type: String,
		},
		ctgrBGC: {
			type: String,
		},
		userId: {
			type: String,
			required: true,
		},
		screen: {
			type: String,
			required: true,
			trim: true,
		},
		orderNum: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Page = model('Page', pageSchema);
