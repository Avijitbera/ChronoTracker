console.log("Hello")

chrome.contextMenus.create({
    id:"start-timer",
    title:"Start Timer",
    contexts:["all"]
})

chrome.contextMenus.create({
    id:"reset-timer",
    title:"Reset Timer",
    contexts:["all"]
})

function createAlarm(name){
    chrome.alarms.create(
        name,
        {
            periodInMinutes:1/60,
        },
        (alarm) =>{
            console.log(alarm)
        }
    )
}
function clearAlarm(name){
    chrome.alarms.clear(
        name,
        (wasCleared)=>{

        }
    )
}

const createNotification = (message) =>{
    const opt = {
        type:'list',
        title:"ChronoTracker",
        message:message,
        priority:1,
        items:[{title:'ChronoTracker', message}],
        iconUrl:'images/stopwatch-2-128.png'
    }
    chrome.notifications.create(opt)
}

let seconds = 25 * 60;
let timerRunning = false;
chrome.alarms.onAlarm.addListener((alarm) =>{
    seconds--;
    const min = Math.floor(seconds / 60)
    chrome.action.setBadgeText({
        text:min.toString()
    },() =>{})

    console.log(seconds)
   if(seconds <= 0){
    
    clearAlarm('chronoTracker-timer')
    createNotification("Your Timer has finished")
    timerRunning = false;
    seconds = 25 * 60;
    chrome.contextMenus.update("start-timer",{
                
        title:"Start Timer",
        contexts:['all']
    })
    chrome.action.setBadgeText({
        text:'-'
    },() =>{})
   }
})

chrome.contextMenus.onClicked.addListener((info, tab) =>{
    switch(info.menuItemId){
        case "start-timer":
            if(timerRunning){
                chrome.contextMenus.update("start-timer",{
                
                    title:"Start Timer",
                    contexts:['all']
                })
                timerRunning = !timerRunning;
                clearAlarm("chronoTracker-timer")
                createNotification("Your Timer has stopped")
                chrome.action.setBadgeText({
                    text:'-'
                },() =>{})
                return;
            }
            createNotification("Your Timer has started")
            timerRunning = true;
            createAlarm("chronoTracker-timer")
            chrome.contextMenus.update("start-timer",{
                
                title:"Stop Timer",
                contexts:['all']
            })
            break;
        default:
            break;
    }
})
// const createContextMenu = () =>{
//     chrome.contextMenus.create({
//         id:"start-timer",
//         title:"Start Timer",
//         contexts:["all"]
//     })
// }

// chrome.runtime.onInstalled.addListener(function(details){
//     if(details.reason == 'install'){
       
//     }else if(details.reason == 'update'){

//     }
// })
chrome.action.setBadgeBackgroundColor(
    {color: 'green'},  // Also, also green
    () => {  },
  );