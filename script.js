const canvas=document.getElementById('space'),ctx=canvas.getContext('2d');let w,h,pts=[];function resize(){w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(120,Math.floor(innerWidth/12))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.3}))}resize();addEventListener('resize',resize);function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.fillStyle='rgba(115,215,255,.48)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<105){ctx.beginPath();ctx.strokeStyle='rgba(90,175,255,'+(0.11*(1-d/105))+')';ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}draw();

const glow=document.getElementById('cursorGlow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.13});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));

document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform='translate('+x*.12+'px,'+y*.12+'px)'});el.addEventListener('pointerleave',()=>el.style.transform='')});

document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),rx=((e.clientY-r.top)/r.height-.5)*-6,ry=((e.clientX-r.left)/r.width-.5)*6;card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-3px)'});card.addEventListener('pointerleave',()=>card.style.transform='')});

const contactForm=document.getElementById('contactForm');
const contactStatus=document.getElementById('contactStatus');
const contactSubmit=document.getElementById('contactSubmit');
if(contactForm){
  contactForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(contactForm).entries());
    if(!data.name || !data.email || !data.message){contactStatus.textContent='Please fill in your name, email and message.';contactStatus.dataset.state='error';return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){contactStatus.textContent='Please enter a valid email address.';contactStatus.dataset.state='error';return}
    contactSubmit.disabled=true;contactSubmit.textContent='Sending...';contactStatus.textContent='';
    try{
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result=await res.json().catch(()=>({}));
      if(!res.ok || !result.success) throw new Error(result.message||'Request failed');
      contactStatus.textContent="Message sent successfully. I'll get back to you soon.";contactStatus.dataset.state='success';contactForm.reset();
    }catch(err){
      const subject=encodeURIComponent('Portfolio contact from '+data.name);
      const body=encodeURIComponent('Name: '+data.name+'\nEmail: '+data.email+'\n\n'+data.message);
      contactStatus.textContent='Backend is unavailable. Opening your email app instead...';contactStatus.dataset.state='error';
      window.location.href='mailto:mitanshushah2007@gmail.com?subject='+subject+'&body='+body;
    }finally{contactSubmit.disabled=false;contactSubmit.textContent='Send message ↗'}
  });
}