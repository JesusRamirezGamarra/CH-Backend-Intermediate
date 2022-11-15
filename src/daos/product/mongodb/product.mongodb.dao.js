class ProductsDaoMongodb {
	#mongooseProductModel;
	constructor(mongooseProductModel) {
		this.#mongooseProductModel = mongooseProductModel;
	}
	create = async (product) => {
		try {
			const newProduct = new this.#mongooseProductModel(product);
			return await this.#mongooseProductModel.create(newProduct);
		} catch (err) { throw err; }
	};
	getAll = async () => {
		try {
			return await this.#mongooseProductModel.find();
		} catch (err) { throw err; }
	};
	getById = async (productId) => {
		try {
			return await this.#mongooseProductModel.findOne({ id: productId });
		} catch (err) { throw err; }
	};
	updateById = async (productId, productData) => {
		try {
			return await this.#mongooseProductModel.findOneAndUpdate({ id: productId }, productData, { new: true });
		} catch (err) { throw err; }
	};
	deleteById = async (productId) => {
		try {
			return await this.#mongooseProductModel.findOneAndDelete({ id: productId });
		} catch (err) { throw err;}
	};
}


export default ProductsDaoMongodb;
