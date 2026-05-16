import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        minlength: 6,
      },

      // ================= GAMIFICATION =================
      score: {
        type: Number,
        default: 0,
      },

      xp: {
        type: Number,
        default: 0,
      },

      level: {
        type: Number,
        default: 1,
      },

      streak: {
        type: Number,
        default: 0,
      },

      badges: [
        {
          type: String,
        },
      ],

     // ================= ROLE =================
role:{

type:String,

enum:[
"user",
"admin"
],

default:"user"

},

// ================= PROFILE =================

avatar:{
type:String,
default:""
},

bio:{
type:String,
default:""
},

      // ================= ACTIVITY =================
      lastActive: {
        type: Date,
        default: Date.now,
      },
      
    },

    {
      timestamps: true,
    }

    
  );

export default mongoose.model(
  "User",
  userSchema
);