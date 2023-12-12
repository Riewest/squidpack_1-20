const QuestObjectType = Java.loadClass('dev.ftb.mods.ftbquests.quest.QuestObjectType')
const FTBTaskTypes = Java.loadClass('dev.ftb.mods.ftbquests.quest.task.TaskTypes')
const Tristate = Java.loadClass('dev.ftb.mods.ftblibrary.config.Tristate')
const Quest = Java.loadClass('dev.ftb.mods.ftbquests.quest.Quest')
const CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const ListTag = Java.loadClass('net.minecraft.nbt.ListTag')
const StringTag = Java.loadClass('net.minecraft.nbt.StringTag')

// Keys should be scoreboard name
// Reading the contents of the file from the given path
const pools = JsonIO.read('kubejs/server_scripts/dynamic_quests/pools.json')


// This function is like a contructor on a class
// it is just parsing out info from the java classes
// Currently kubejs doesn't support custom js classes so this will have to do.
function loadDynamicQuest(event) {
    let quest = event.getObject()
    let isDynamic = (quest.getObjectType() == QuestObjectType.QUEST && String(quest.getRawDescription()).includes("Dynamic Quest"))

    if (!isDynamic) {
        return null
    }

    let dQuest = {}
    dQuest.quest = quest
    dQuest.isDynamic = isDynamic,
        dQuest.hasBeenCompleted = !quest.getRawSubtitle()

    dQuest.title = quest.getRawTitle()
    let [titleGroup, titleNumber] = quest.getRawTitle().split('-');
    dQuest.titleGroup = titleGroup
    dQuest.titleNumber = titleNumber

    dQuest.teamData = event.getData().getData()
    dQuest.teamName = dQuest.teamData.getName().split('#')[0]

    dQuest.questfile = quest.getQuestFile()
    dQuest.chapter = quest.getQuestChapter()

    return dQuest
}


function addScore(event, team_name, scoreboard, score) {
    let templateCmd = "scoreboard players add <team_name> <scoreboard_to_add_to> <number_to_add_to_score>"
    let scoreCMD = templateCmd.replace("<team_name>", team_name).replace("<scoreboard_to_add_to>", scoreboard).replace("<number_to_add_to_score>", score)
    event.server.runCommandSilent(scoreCMD);
}

function getRandomTaskKey(pool) {
    var keys = Object.keys(pool);
    let randomIndex = Math.floor(Math.random() * keys.length);
    let taskKey = keys[randomIndex]
    return taskKey
}


function getOldTaskModifier(oldTask){

    let oldTags = oldTask.getTags()
    let pool_key_tag = oldTags.find(tag => tag.includes("dq_pool"))
    let task_key_tag = oldTags.find(tag => tag.includes("dq_task_key"))

    if(!(pool_key_tag || task_key_tag)){ return 1 }

    let pool_key = pool_key_tag.split(":")[1]
    let task_key = task_key_tag.split(":")[1]
    let oldTaskDef = pools[pool_key][task_key] || {type: TaskTypes.ItemTask.id}
    switch (oldTaskDef.type) {
        case TaskTypes.ForgeEnergyTask.id:
            return oldTaskDef.data
        case TaskTypes.FluidTask.id:
            return oldTaskDef.data.amount;

            // ItemTask and Default are the same this will fall into block below
        case TaskTypes.ItemTask.id:
        default:
            return 1;
            
    }
}

function safeNumber(number){
    if(number > Number.MAX_SAFE_INTEGER){
        return Number.MAX_SAFE_INTEGER
    }
    return number
}

function getNewTask(pool, newId, newQuest, oldTask){
    let taskKey = getRandomTaskKey(pools[pool])
    let randomTask = pools[pool][taskKey]
    let oldModifier = getOldTaskModifier(oldTask)
    let newCount = (oldTask.getMaxProgress() / oldModifier) * 2
    let cTag = new CompoundTag();
    let tagList = new ListTag();
    tagList.add(StringTag.valueOf(`dq_pool:${pool}`))
    tagList.add(StringTag.valueOf(`dq_task_key:${taskKey}`))
    cTag.put("tags", tagList)
    
    switch (randomTask.type) { //types are defined in quest_command.js
        case TaskTypes.ForgeEnergyTask.id:
            let energytask = new TaskTypes.ForgeEnergyTask.object(newId, newQuest)
            energytask.readData(cTag);
            energytask.setValue(safeNumber(newCount * randomTask.data))
            return energytask
        case TaskTypes.FluidTask.id:
            let fluidtask = new TaskTypes.FluidTask.object(newId, newQuest)
            
            cTag.putLong("amount", safeNumber(newCount * randomTask.data.amount));
            fluidtask.readData(cTag);
            fluidtask.setFluid(randomTask.data.name)
            return fluidtask;

            // ItemTask and Default are the same this will fall into block below
        case TaskTypes.ItemTask.id:
        default:
            let itemtask = new TaskTypes.ItemTask.object(newId, newQuest)
            itemtask.readData(cTag);
            itemtask.setStackAndCount(randomTask.data, safeNumber(newCount))
            return itemtask;
    }
}

function firstCompletion(dQuest, event) {
    console.log("First Completion")
    let quest = dQuest.quest
    let questfile = dQuest.questfile
    let chapter = dQuest.chapter
    let pool = dQuest.titleGroup.toLowerCase()

    let newNumber = parseInt(dQuest.titleNumber) + 1;
    let newQuest = quest.copy(quest, () => new Quest(questfile.newID(), chapter))
    let newTitle = `${dQuest.titleGroup}-${newNumber}`;
    newQuest.setRawTitle(newTitle)
    newQuest.setX(newQuest.getX() + 1)
    newQuest.clearDependencies()
    newQuest.addDependency(quest)

    let tasks = quest.getTasksAsList()
    let oldTask = tasks[0]
    let newTask = getNewTask(pool, questfile.newID(), newQuest, oldTask)
    newQuest.addTask(newTask)
    chapter.addQuest(newQuest)

    const mainDynamicQuestID = "1985B1B03E268A22"
    let mainQuest = questfile.getQuest(questfile.getID(mainDynamicQuestID))
    mainQuest.addDependency(newQuest)


    quest.setRawSubtitle(dQuest.teamName)
    questfile.markDirty()
    questfile.saveNow()

    event.server.runCommandSilent("ftbquests reload");
    addScore(event, dQuest.teamName, "first_completions", 1)




    let completedBroadcastMsg = [
        {
            "text": dQuest.teamName,
            "color": "gold"
        },
        {
            "text": " has completed ",
            "color": "white"
        },
        {
            "text": dQuest.title,
            "color": "gold",
            "hoverEvent": {
                "action": "show_text",
                "contents": oldTask.getAltTitle().getString()
            }
        },
        {
            "text": " first!\nGenerated New Quest: ",
            "color": "white"
        },
        {
            "text": newTitle,
            "color": "#32FBFF",
            "hoverEvent": {
                "action": "show_text",
                "contents": newTask.getAltTitle().getString()
            }
        }
    ]
    broadcast(event, completedBroadcastMsg)
}


function everyCompletion(dQuest, event) {
    let scoreboard = dQuest.titleGroup.toLowerCase()
    addScore(event, dQuest.teamName, "total", 1)
    addScore(event, dQuest.teamName, scoreboard, 1)
}


function broadcast(event, msgObj) {
    let jsonMsgStr = JSON.stringify(msgObj)
    let msgCMD = `tellraw @a ${jsonMsgStr}`
    event.server.runCommandSilent(msgCMD)
}


FTBQuestsEvents.completed(event => {

    let dQuest = loadDynamicQuest(event)
    console.log("Quest Completed Event")

    if (dQuest && dQuest.isDynamic) {
        console.log("Dynamic Quest Completed")

        if (dQuest.hasBeenCompleted) {
            firstCompletion(dQuest, event)
        }
        everyCompletion(dQuest, event)

    }
}
)