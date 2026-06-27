import { getIO } from "../socket.js";
import { getChannel } from "./rabbitmq.js";


export const startRealtimeConsumer = async ()=>{
    const channel = getChannel();

    channel.consume(process.env.REALTIME_QUEUE!,async (msg)=>{
        // here we will get our room event payload from the msg right
        console.log("RAW MESSAGE:");
        if(!msg) return;
        console.log(msg.content.toString());

        try{
            const msgcontent = JSON.parse(msg.content.toString());
            console.log("Parsed:", msgcontent);

            if(msgcontent.type != "EMIT_SOCKET_EVENT"){
                console.log("Skipped because type =", msgcontent.type);
                channel.ack(msg);
                return;
            }

            console.log("Data:", msgcontent.data);
            
            const {event,room,payload} = msgcontent.data;
            if(!event || !room){
                // ack the message 
                console.log("No room or event received")
                channel.ack(msg);
                return;
            }

            const io = getIO();

            console.log(`Emitting event ${event} to room ${room}`);

            io.to(room).emit(event,payload??{});

            channel.ack(msg)

        }catch (error){
            console.error("Realtime Consume error", error);
            channel.ack(msg)
        }
    })
}
