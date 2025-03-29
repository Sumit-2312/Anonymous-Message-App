import { Schema, model, Document, models } from "mongoose";

// Interfaces for TypeScript Support
export interface UserInterface extends Document {    // extending the document is optional
    username: string;
    password: string;
    email: string;
    verifyCode?: string;        // verify code may or may not be there in the schema 
    verifyCodeExpiry?: Date;
    isAccepting?: boolean;
    isVerified: boolean;
}

export interface MessageInterface extends Document {
    userId: Schema.Types.ObjectId;
    message: string;
    date: Date;
}


const userSchema: Schema<UserInterface> = new Schema({
    username: { type: String, unique: true, required: [true, "Username is required!"] },  // this error will be there in catch block
    password: { 
        type: String, 
        required: [true, "Password is required!"],
    },
    email: { 
        type: String, 
        required: [true, "Email is required!"], 
        unique: true, 
    },
    verifyCode: { type: String },
    verifyCodeExpiry: { type: Date },
    isAccepting: { type: Boolean },
    isVerified : {type: Boolean, default: false}
});

const messageSchema: Schema<MessageInterface> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    message: { type: String, required: [true, "Message cannot be empty"] },
    date: { type: Date, required: true, default: Date.now }
});

// models contains all the models that are already created in the application
// if the model is already created then use that model otherwise create a new model and use that
// this is done to avoid multiple creation of the same model due to hot reloading in development mode
const userModel = models.users || model<UserInterface>("users", userSchema);
const messageModel = models.messages || model<MessageInterface>("messages", messageSchema);

export { userModel as Users, messageModel as Messages };
