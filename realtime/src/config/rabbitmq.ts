import amqp from "amqplib";

let channel : amqp.Channel;

export const connectRabbitMQ = async()=>{
    const Connection = await amqp.connect(process.env.RABBITMQ_URL!);

    channel = await Connection.createChannel();

    await channel.assertQueue(process.env.REALTIME_QUEUE!,{
        durable:true
    });

    console.log("RabbitMQ connected realtime service");
}

export const getChannel = () => channel;