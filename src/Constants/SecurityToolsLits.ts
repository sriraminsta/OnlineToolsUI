import type {ToolCard} from '../types/ToolCard';

export const SecurityToolsList :  ToolCard[] = [
  // ── SECURITY TOOLS ──
  { id:1, 
    name:'Password Strength Checker',description:'Score your password strength and entropy',         icon:'🛡️',   status:'COMING SOON',       url:'./security-tools/password-strength' },
  {id:2, 
    name:'SHA-256 Hash Generator',   description:'Generate secure SHA-256 hash from any text',       icon:'🧲',   status:'COMING SOON',       url:'./security-tools/sha256'            },
  { id:3, 
    name:'SHA-1 Hash Generator',     description:'Generate SHA-1 hash using SubtleCrypto API',       icon:'🔑',   status:'COMING SOON',      url:'./security-tools/sha1'              },
  { id:4, 
    name:'MD5 Hash Generator',       description:'Generate MD5 hash from any text',                  icon:'🔐',   status:'COMING SOON',      url:'./security-tools/md5'               },
  { id:5, 
    name:'JWT Decoder',              description:'Decode and inspect JWT token header and payload',  icon:'🔓',   status:'COMING SOON',      url:'./security-tools/jwt-decoder'       },
  {id:6, 
    name:'AES Encryption',           description:'Encrypt and decrypt text with AES',                icon:'🔒',   status:'COMING SOON',     url:'./security-tools/aes-encrypt'       },
  { id:7,
         name:'Text to Binary',           description:'Convert text to binary — every character to bits', icon:'💻', status:'COMING SOON',     url:'./security-tools/text-to-binary'    },
  { id:8,
   
    name:'Caesar Cipher',            description:'Encrypt text with Caesar shift cipher',            icon:'🔤',  status:'COMING SOON',     url:'./security-tools/caesar-cipher'     },
  {id:9,
     
    name:'ROT13 Encoder',            description:'ROT13 encoding — Caesar shift of 13',              icon:'🔄',  status:'COMING SOON',     url:'./security-tools/rot13'             },
]