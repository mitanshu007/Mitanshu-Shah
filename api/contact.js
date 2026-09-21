const { Resend } = require("resend");

module.exports = async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({success:false,message:"Method not allowed."});
  try{
    const {name,email,message}=req.body||{};
    if(!name||!email||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({success:false,message:"Please provide a valid name, email and message."});
    if(String(name).length>100||String(email).length>200||String(message).length>5000)
      return res.status(400).json({success:false,message:"Your message is too long."});
    if(!process.env.RESEND_API_KEY)
      return res.status(500).json({success:false,message:"Contact service is not configured yet."});
    const resend=new Resend(process.env.RESEND_API_KEY);
    const result=await resend.emails.send({
      from:"Portfolio <onboarding@resend.dev>",
      to:["mitanshushah2007@gmail.com"],
      replyTo:email,
      subject:"New portfolio contact — "+String(name).slice(0,80),
      text:"Name: "+name+"\nEmail: "+email+"\nTime: "+new Date().toISOString()+"\n\nMessage:\n"+message
    });
    if(result.error) throw new Error(result.error.message);
    return res.status(200).json({success:true,message:"Message sent successfully."});
  }catch(error){
    return res.status(500).json({success:false,message:"Unable to send your message right now."});
  }
};