const btn = document.querySelector(".changeColorButton");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");


btn.addEventListener('click' , async()=>{
    let [tab] = await chrome.tabs.query({active:true , currentWindow : true});
    
    chrome.scripting.executeScript({
        target:{tabId : tab.id} ,
        function : pickColor,
    }, async(injectionResult)=>{
        const [data] = injectionResult;
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = `Hexcode : ${color}`;
            
            try {
                await navigator.clipboard.writeText(color);
            } catch (error) {
                console.error(error);
            }
        }

        
    })
})


async function pickColor(){
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
       
    } catch (error) {
        console.error(error);
    }
}