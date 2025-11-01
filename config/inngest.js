
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });
import connectToDB from "./db";
import User from "./models/User";
import { inngest, syncUserCreation, syncUserDeletion } from "@/config/inngest"; 



// User creation function
export const syncUserCreation = inngest.createFunction(
  {
    id: 'sync-user-from-clerk'
  },
  { event: 'clerk/user.created'},
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name +' ' + last_name,
      imageUrl: image_url
    };
    await connectToDB()
    await User.create(userData);
  }
);

// User update function - CHANGED NAME
export const syncUserUpdate = inngest.createFunction(
  {
    id: ' update-user-from-clerk '
  },
  {
    event: 'clerk/user.updated'
  },
async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name +' ' + last_name,
      imageUrl: image_url
    };
    
    await connectToDB();
    await User.findByIdAndUpdate(id, userData)
  }
);

// User deletion function
export const syncUserDeletion = inngest.createFunction(
  {
    id: 'delete-user-with-cler'
  },
  {
    event: 'clerk/user.deleted'
  },
  async ({ event }) => {
    const { id } = event.data;
    await connectToDB();
    await User.findByIdAndDelete(id)
  }
);