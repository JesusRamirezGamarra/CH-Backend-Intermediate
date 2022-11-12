import bcrypt from 'bcrypt';
// export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
// export const isValidPassword = (user,password ) => bcrypt.compareSync(password,user.password);


export const makeEncryptPass = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
// export const isValidPassword = (user,password ) => bcrypt.compareSync(password,user.password);
export const isValidPassword = (password,hash) => bcrypt.compareSync(password,hash);

// export const makeEncryptPass = (password) => {
//     return bcrypt.hash(password,bcrypt.genSalt(10));
// }
// export const isValidPassword = (password, hash) => {
//     return bcrypt.compare(password, hash)
// };

// export const  makeAyncEncryptPass = async (password) => {
//     const salts = await bcrypt.genSalt(10);
//     return bcrypt.hash(password,salts);    
//     // return await bcrypt.hash(password, 10)
// };
// export const isAyncValidPassword = async (password, hash) => {
//     return await bcrypt.compare(password, hash)
// };


export default makeEncryptPass

