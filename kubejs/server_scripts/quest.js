const QuestObjectType = Java.loadClass('dev.ftb.mods.ftbquests.quest.QuestObjectType')
const ItemTask = Java.loadClass('dev.ftb.mods.ftbquests.quest.task.ItemTask')
const Tristate = Java.loadClass('dev.ftb.mods.ftblibrary.config.Tristate')
const Quest = Java.loadClass('dev.ftb.mods.ftbquests.quest.Quest')

// Keys should be scoreboard name
const items = {
    vanilla: [
            'minecraft:oak_log',
            'minecraft:stone',
            'minecraft:cobblestone',
            'minecraft:obsidian',
            'minecraft:poppy',
            'minecraft:bamboo',
            'minecraft:cactus',
            'minecraft:sugar_cane',
            'minecraft:kelp',
            'minecraft:redstone',
            'minecraft:torch',
            'minecraft:dispenser',
            'minecraft:furnace',
            'minecraft:lightning_rod',
            Item.of('minecraft:diamond_pickaxe','{Damage:0}'),
            'minecraft:spyglass',
            'minecraft:golden_carrot',
            'minecraft:cake',
            'minecraft:cherry_stairs',
            'minecraft:mossy_stone_brick_wall',
            'minecraft:soul_sand',
            'minecraft:bone_block',
            'minecraft:piston',
            'minecraft:tnt',
            'minecraft:egg',
            'minecraft:popped_chorus_fruit',
            'minecraft:apple'],
    magic: [
            Item.of('irons_spellbooks:iron_spell_book','{ISB_spellbook:{activeSpellIndex:-1,spellSlots:5,spells:[]}}'),
            'createsweetsandtreets:purple_rock_candy',
            'create_sa:heap_of_experience',
            'advancedperipherals:weak_automata_core',
            Item.of('minecraft:potion','{Potion:"minecraft:night_vision"}'),
            'minecraft:beacon',
            'minecraft:enchanting_table',
            'irons_spellbooks:greater_oakskin_elixir',
            'botania:fertilizer',
            'botania:spark',
            Item.of('botania:brew_flask','{brewKey:"botania:feather_feet"}'),
            'botania:mana_pylon',
            'botania:white_shiny_flower',
            'botania:dreamwood_twig',
            'minecraft:glow_berries', 
            'botania:tiny_potato', 
            'botania:mana_powder', 
            'botania:livingwood_twig', 
            'botania:grass_seeds'],
    tech: [
            'computercraft:computer_normal',
            'computercraft:computer_advanced',
            Item.of('computercraft:turtle_normal', '{RightUpgrade:"minecraft:diamond_pickaxe",RightUpgradeNbt:{Tag:{Damage:0}}}'),
            Item.of('computercraft:turtle_advanced', '{RightUpgrade:"minecraft:diamond_sword",RightUpgradeNbt:{Tag:{Damage:0}}}'),
            'create:gearbox',
            'create:mechanical_drill',
            'createbigcannons:cast_iron_block',
            'create:fluid_pipe',
            'create:track',
            'ae2:logic_processor',
            'create:electron_tube',
            'create:precision_mechanism',
            'ae2:calculation_processor',
            'ae2:engineering_processor',
            'ae2:molecular_assembler',
            'createaddition:tesla_coil',
            'create_sa:brass_drone_item',
            'create_sa:flamethrower',
            'littlelogistics:energy_tug',
            'simplemagnets:advancedmagnet']
}


function getRandomString(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

FTBQuestsEvents.completed(event => {

    let quest = event.getObject()
    
    if (quest.getObjectType() == QuestObjectType.QUEST && String(quest.getRawDescription()).includes("Automatic Quest")) {
        let id = quest.getID(quest)
        let title = quest.getRawTitle()
        let [baseString, currentNumber] = title.split('-');
        let scoreboard = baseString.toLowerCase()
        let newNumber = parseInt(currentNumber) + 1;
        let teamData = event.getData().getData()
        let teamName = teamData.getName().split('#')[0]
        console.log("QUEST COMPLETED?")
        console.log(title)
        console.log(id)
        
        if (!quest.getRawSubtitle()) {
            let questfile = quest.getQuestFile()
            let chapter = quest.getQuestChapter()
            console.log(chapter)
            
            let newQuest = quest.copy(quest, () => new Quest(questfile.newID(), chapter))
            let newTitle = `${baseString}-${newNumber}`;
            newQuest.setRawTitle(newTitle)
            newQuest.setX(newQuest.getX() + 1)
            newQuest.clearDependencies()
            newQuest.addDependency(quest)

            let tasks = quest.getTasksAsList()
            let task = tasks[0]
            let newTask = new ItemTask(questfile.newID(), newQuest)
            let newCount = task.getMaxProgress() * 2
            let newItem = getRandomString(items[scoreboard])
            newTask.setStackAndCount(newItem, newCount)
            console.log(newTask)
            newQuest.addTask(newTask)
            console.log(newQuest)
            chapter.addQuest(newQuest)

            
            quest.setRawSubtitle(teamName)
            questfile.markDirty()
            questfile.saveNow()

            event.server.runCommandSilent("ftbquests reload");
        }


        let templateCmd = "scoreboard players add <team_name> <scoreboard_to_add_to> <number_to_add_to_score>"

        let totalScoreCommand = templateCmd.replace("<team_name>", teamName).replace("<scoreboard_to_add_to>", "total").replace("<number_to_add_to_score>", 1)
        let scoreCommand = templateCmd.replace("<team_name>", teamName).replace("<scoreboard_to_add_to>", scoreboard).replace("<number_to_add_to_score>", 1)

        event.server.runCommandSilent(totalScoreCommand);
        event.server.runCommandSilent(scoreCommand);

    }
}
)