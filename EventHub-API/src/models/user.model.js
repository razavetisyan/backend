const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AUTH = require("../constants/auth.constants.js");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["member", "organizer"],
            default: "member"
        },

        refreshToken: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, AUTH.HASH_SALT_ROUNDS);
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.__v;
    delete user.password;
    delete user.refreshToken;
    return user;
};

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);