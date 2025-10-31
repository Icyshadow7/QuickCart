import { Inngest, InngestFunction } from "inngest";
import connectToDB from "./db";
import { comment } from "postcss/lib/postcss";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "SleekCart-next" });
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created '},
    async ({ event }) => {
        const { id, first_name,
            last_name, image_url }=event.data
            const userData={
                _id:id,
                emali:email_adderesses,
                name:first_name+''+last_name,
                imageURL:image_url
            }
            await connectToDB()
            await User.create(userData)
    })

export const syncUserCreation =inngest.createFunction(
    {
id:'update-user-from-clerk'
},
{
    event:'clerk/user.updated'
},
async({event}) =>{
      const { id, first_name,
            last_name, image_url }=event.data
            const userData={
                _id:id,
                emali:email_adderesses,
                name:first_name+''+last_name,
                imageURL:image_url
            }
    
await connectDB()

await User.findByIDAndUpdate(id,userData)
}
)
export const syncUserDeletion =inngest.createFunction(
    {
    id:'delete-user-from-clerk'
    },
    {
        event:'clerk/user.deleted'
    },
    async({event})=>{
        const{id}=event.data
        await connectToDB()
        await User.findByIDAndUpdate(id)
    }
)