import { mongoose } from "mongoose";


const mongooseProductModel = mongoose.model(
	"Product",
	{
		id: { type: Number, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		thumbnail: { type: String, required: true },
		code: { type: String, required: true },
		timestamp:{ type: String, required: true },
	},
	"products"
);


export default mongooseProductModel;
