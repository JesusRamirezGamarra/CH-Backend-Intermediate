import { mongoose } from "mongoose";


const mongooseProductModel = mongoose.model(
	"Product",
	{
		id: { type: String, required: true, index: {unique: true } },
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		thumbnail: { type: String, required: true },
		// code: { type: String, required: true },
		timestamp:{ type: Date, required: true, default: Date.now},
	},
	"products"
);


export default mongooseProductModel;
