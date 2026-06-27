import { getIO } from "../socket.js";
import { getChannel } from "./rabbitmq.js";


export const startRealtimeConsumer = async ()=>{
    const channel = getChannel();

    channel.consume(process.env.REALTIME_QUEUE!,async (msg)=>{
        // here we will get our room event payload from the msg right

        if(!msg) return;

        try{
            const msgcontent = JSON.parse(msg.content.toString());

            if(msgcontent.type != "EMIT_SOCKET_EVENT"){
                channel.ack(msg);
            }

            const {event,room,payload} = msgcontent.data;
            if(!event || !room){
                // ack the message 
                channel.ack(msg);
            }

            const io = getIO();

            console.log(`Emitting event ${event} to room ${room}`);

            io.to(room).emit(event,payload??{});

            channel.ack(msg)

        }catch (error){
            console.error("Realtime Consume error", error);
        }
    })
}
