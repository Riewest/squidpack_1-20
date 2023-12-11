const QuestObjectType = Java.loadClass('dev.ftb.mods.ftbquests.quest.QuestObjectType')
const ItemTask = Java.loadClass('dev.ftb.mods.ftbquests.quest.task.ItemTask')
const Tristate = Java.loadClass('dev.ftb.mods.ftblibrary.config.Tristate')
const Quest = Java.loadClass('dev.ftb.mods.ftbquests.quest.Quest')

// Keys should be scoreboard name
// Reading the contents of the file from the given path
const items = JsonIO.read('kubejs/server_scripts/dynamic_quests/pools.json')
// Writing to an existing/new file
// JsonIO.write('kubejs/config/myawesomeconfig.json', {settinga: 'creeper', weirdblock: 'minecraft:end_gateway'})

function getRandomString(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

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
    let task = tasks[0]
    let newTask = new ItemTask(questfile.newID(), newQuest)
    let newCount = task.getMaxProgress() * 2
    let newItem = getRandomString(items[pool])
    newTask.setStackAndCount(newItem, newCount)
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
                "contents": `${task.getMaxProgress()} - ${task.getItemStack().getItem()}`
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
                "contents": `${newTask.getMaxProgress()} - ${newTask.getItemStack().getItem()}`
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








// const items = {
//     vanilla: [
//             'minecraft:oak_log',
//             'minecraft:stone',
//             'minecraft:cobblestone',
//             'minecraft:obsidian',
//             'minecraft:poppy',
//             'minecraft:bamboo',
//             'minecraft:cactus',
//             'minecraft:sugar_cane',
//             'minecraft:kelp',
//             'minecraft:redstone',
//             'minecraft:torch',
//             'minecraft:dispenser',
//             'minecraft:furnace',
//             'minecraft:lightning_rod',
//             Item.of('minecraft:diamond_pickaxe','{Damage:0}'),
//             'minecraft:spyglass',
//             'minecraft:golden_carrot',
//             'minecraft:cake',
//             'minecraft:cherry_stairs',
//             'minecraft:mossy_stone_brick_wall',
//             'minecraft:soul_sand',
//             'minecraft:bone_block',
//             'minecraft:piston',
//             'minecraft:tnt',
//             'minecraft:egg',
//             'minecraft:popped_chorus_fruit',
//             'minecraft:apple'],
//     magic: [
//             Item.of('irons_spellbooks:iron_spell_book','{ISB_spellbook:{activeSpellIndex:-1,spellSlots:5,spells:[]}}'),
//             'createsweetsandtreets:purple_rock_candy',
//             'create_sa:heap_of_experience',
//             'advancedperipherals:weak_automata_core',
//             Item.of('minecraft:potion','{Potion:"minecraft:night_vision"}'),
//             'minecraft:beacon',
//             'minecraft:enchanting_table',
//             'irons_spellbooks:greater_oakskin_elixir',
//             'botania:fertilizer',
//             'botania:spark',
//             Item.of('botania:brew_flask','{brewKey:"botania:feather_feet"}'),
//             'botania:mana_pylon',
//             'botania:white_shiny_flower',
//             'botania:dreamwood_twig',
//             'minecraft:glow_berries',
//             'botania:tiny_potato',
//             'botania:mana_powder',
//             'botania:livingwood_twig',
//             'botania:grass_seeds'],
//     tech: [
//             'computercraft:computer_normal',
//             'computercraft:computer_advanced',
//             Item.of('computercraft:turtle_normal', '{RightUpgrade:"minecraft:diamond_pickaxe",RightUpgradeNbt:{Tag:{Damage:0}}}'),
//             Item.of('computercraft:turtle_advanced', '{RightUpgrade:"minecraft:diamond_sword",RightUpgradeNbt:{Tag:{Damage:0}}}'),
//             'create:gearbox',
//             'create:mechanical_drill',
//             'createbigcannons:cast_iron_block',
//             'create:fluid_pipe',
//             'create:track',
//             'ae2:logic_processor',
//             'create:electron_tube',
//             'create:precision_mechanism',
//             'ae2:calculation_processor',
//             'ae2:engineering_processor',
//             'ae2:molecular_assembler',
//             'createaddition:tesla_coil',
//             'create_sa:brass_drone_item',
//             'create_sa:flamethrower',
//             'littlelogistics:energy_tug',
//             'simplemagnets:advancedmagnet']
// }