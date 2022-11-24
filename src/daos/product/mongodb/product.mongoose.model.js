import { mongoose } from "mongoose";


const mongooseProductModel = mongoose.model(
	"Product",
	// (
		{
			sku: { type: String, required: true, index: {unique: true } },
			name: { type: String, required: true },
			description: { type: String, required: true },
			price: { type: Number, required: true },
			stock: { type: Number, required: true },
			thumbnail: { type: String, required: true },
			// code: { type: String, required: true },
			timestamp:{ type: Date, required: true, default: Date.now},
			// categories:{
			// 	type : mongoose.Schema.Types.ObjectId, 
			// 	ref : 'Category'},
		},
	// 	{ timestamps:true}
	// ),
	"products"
);


export default mongooseProductModel;
