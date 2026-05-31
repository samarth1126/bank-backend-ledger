const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")





const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email chahiye bhaiiiiii"],
        trim:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/, "Invalid Email"],
        unique:[true,"Email copy kar rahe heeee beteteeee"]
    },
    name:{
        type:String,
        required:[true,"Name chahiye mann"]
    },
    password:{
        type:String,
        required:[true,"Password to chahiyey na bhaiii"],
        minlength:[6,"password atleast 6 character ka toh hona chahiye"],
        select:false
    }
},{
    timestamps:true
})

// user.models.js - more defensive version
// ❌ OLD WAY (Mongoose 5 style) - causes the error
// userSchema.pre("save", async function(next) {
//     try {
//         if (!this.isModified("password")) return next();
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//     } catch(err) {
//         next(err);
//     }
// });

// ✅ NEW WAY (Mongoose 6/7/8) - just use async/await, no next()
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password)
}

const userModel=mongoose.model("user",userSchema)
module.exports=userModel