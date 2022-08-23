
export default function RandomColors() {

    const colors = [
        'linear-gradient(180deg,#f44881,#ec454f)',
        'linear-gradient(0deg,#f19a1a,#ffc73c)',
        'linear-gradient(180deg,#21c8f6,#637bff)',
        'linear-gradient(180deg,#6edcc4,#1aab8b)',
        'linear-gradient(0deg,#8b60ed,#b372bd)',
        'linear-gradient(#d66d75, #e29587)',
        'linear-gradient(#4568dc, #b06ab3)',
        'linear-gradient(#43c6ac, #f8ffae)',
        'linear-gradient(#ffafbd, #ffc3a0)',
        'linear-gradient(#00c3ff, #ffff1c)'
        
    ];

    const random = (color)=>{
        return color[Math.floor(Math.random() * color.length)];

    }
  return random(colors)
}

