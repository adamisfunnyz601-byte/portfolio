const express=require('express');
const http=require('http');
const path=require('path');
const crypto=require('crypto');
const {Server}=require('socket.io');
const {Pool}=require('pg');
const app=express();
const server=http.createServer(app);
const io=new Server(server,{maxHttpBufferSize:16000});
const pool=process.env.DATABASE_URL?new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.DATABASE_URL.includes('localhost')?false:{rejectUnauthorized:false}}):null;
const ADMIN_KEY=process.env.ADMIN_KEY||'';
const EMAIL=process.env.CONTACT_EMAIL||'adammalik1234674@gmail.com';
const GENDER=process.env.PUBLIC_GENDER||'';
const PORT=process.env.PORT||3000;
const memory=[];const visitors=new Map();const limits=new Map();
app.disable('x-powered-by');app.use(express.static(path.join(__dirname,'public')));
app.get('/api/profile',(req,res)=>res.json({name:'Adam',username:'adamisfunnyz601-byte',email:EMAIL,gender:GENDER||null}));
app.get('/health',(req,res)=>res.json({ok:true,database:!!pool}));
async function init(){if(pool)await pool.query('CREATE TABLE IF NOT EXISTS portfolio_chat(id BIGSERIAL PRIMARY KEY,visitor_id TEXT NOT NULL,sender TEXT NOT NULL,name TEXT NOT NULL,message TEXT NOT NULL,created_at TIMESTAMPTZ DEFAULT NOW())')}
function clean(v,n){return String(v||'').replace(/[\x00-\x1f\x7f]/g,' ').trim().slice(0,n)}
async function save(m){if(pool){const r=await pool.query('INSERT INTO portfolio_chat(visitor_id,sender,name,message) VALUES($1,$2,$3,$4) RETURNING id,visitor_id AS "visitorId",sender,name,message,created_at',[m.visitorId,m.sender,m.name,m.message]);return r.rows[0]}const x={...m,id:crypto.randomUUID(),created_at:new Date().toISOString()};memory.push(x);if(memory.length>150)memory.shift();return x}
io.on('connection',socket=>{const id=clean(socket.handshake.auth&&socket.handshake.auth.visitorId,80)||crypto.randomUUID();socket.data.visitorId=id;visitors.set(id,socket);socket.emit('visitor-id',id);
socket.on('load-history',async()=>{const rows=pool?(await pool.query('SELECT id,visitor_id AS "visitorId",sender,name,message,created_at FROM portfolio_chat WHERE visitor_id=$1 ORDER BY created_at DESC LIMIT 60',[id])).rows:memory.filter(m=>m.visitorId===id).slice(-60);socket.emit('chat-history',rows.reverse())});
socket.on('join-owner',key=>{if(!ADMIN_KEY||typeof key!=='string'||key.length!==ADMIN_KEY.length||!crypto.timingSafeEqual(Buffer.from(key),Buffer.from(ADMIN_KEY)))return socket.emit('owner-auth',{ok:false});socket.data.owner=true;socket.join('owners');socket.emit('owner-auth',{ok:true})});
socket.on('visitor-message',async p=>{const now=Date.now();const k=socket.handshake.address||id;const old=limits.get(k)||{t:now,n:0};if(now-old.t>60000){old.t=now;old.n=0}if(++old.n>12){limits.set(k,old);return socket.emit('chat-error','Please wait before sending another message.')}limits.set(k,old);const message=clean(p&&p.message,1200);if(!message)return;const m=await save({visitorId:id,sender:'visitor',name:clean(p&&p.name,40)||'Visitor',message});socket.emit('message-sent',m);io.to('owners').emit('new-message',m)});
socket.on('owner-reply',async p=>{if(!socket.data.owner)return;const visitorId=clean(p&&p.visitorId,80);const message=clean(p&&p.message,1200);if(!visitorId||!message)return;const m=await save({visitorId,sender:'owner',name:'Adam',message});const target=visitors.get(visitorId);if(target)target.emit('new-message',m);socket.emit('new-message',m)});
socket.on('disconnect',()=>{if(visitors.get(id)===socket)visitors.delete(id)})});
init().then(()=>server.listen(PORT,'0.0.0.0',()=>console.log('Portfolio listening on '+PORT))).catch(e=>{console.error(e);process.exit(1)});
process.on('SIGTERM',async()=>{server.close();if(pool)await pool.end();process.exit(0)});
