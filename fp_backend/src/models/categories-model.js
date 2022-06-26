import { Schema, model } from 'mongoose';

const categorieSchema = new Schema(
	{
		catName: {
			type: String,
			required: true,
			trim: true,
		},
		catClass: {
			type: String,
			required: true,
			trim: true,
		},
		catColor: {
			type: String,
			required: true,
			trim: true,
		},
		catBGC: {
			type: String,
			required: true,
			trim: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Categorie = model('Categorie', categorieSchema);
