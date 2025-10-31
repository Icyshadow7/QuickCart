import { Inngest } from "inngest";
import connectToDB from "./db";
import User from "./models/User"; // Make sure to import your User model

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation = inngest.createFunction(
  {
    id: 'sync-user-from-clerk'
  },
  {
    event: 'clerk/user.created' // Removed extra space
  },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data; // Fixed variable name
    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address, // Fixed typo and added proper email access
      name: `${first_name} ${last_name}`, // Better string concatenation
      imageURL: image_url
    };
    await connectToDB();
    await User.create(userData);
  }
);

export const syncUserUpdate = inngest.createFunction( // Changed function name
  {
    id: 'update-user-from-clerk'
  },
  {
    event: 'clerk/user.updated'
  },
  async ({ event }) => {
    const { id, first_name, last_name, image_url, email_addresses } = event.data;
    const userData = {
      email: email_addresses[0]?.email_address, // Fixed typo
      name: `${first_name} ${last_name}`,
      imageURL: image_url
    };
    
    await connectToDB(); // Fixed function name
    await User.findByIdAndUpdate(id, userData); // Fixed method name
  }
);

export const syncUserDeletion = inngest.createFunction(
  {
    id: 'delete-user-from-clerk'
  },
  {
    event: 'clerk/user.deleted'
  },
  async ({ event }) => {
    const { id } = event.data;
    await connectToDB();
    await User.findByIdAndDelete(id); // Fixed method name - use delete instead of update
  }
);