
const poolJsonPath = 'kubejs/server_scripts/dynamic_quests/pools.json'

// Used to create pools
const QuestLines = ["Vanilla", "Tech", "Magic"]


const ItemTask = Java.loadClass('dev.ftb.mods.ftbquests.quest.task.ItemTask')
const FluidTask = Java.loadClass('dev.ftb.mods.ftbquests.quest.task.FluidTask')
const ForgeEnergyTask = Java.loadClass('dev.ftb.mods.ftbquests.quest.task.forge.ForgeEnergyTask')
const TaskTypes = {
    ItemTask: {id: "ItemTask", object: ItemTask},
    FluidTask: {id: "FluidTask", object: FluidTask},
    ForgeEnergyTask: {id: "ForgeEnergyTask", object: ForgeEnergyTask}
}

const slugify = text =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')


// Registering the custom command
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    let addHandCMD = Commands.literal("add_hand")
    let addInvCMD = Commands.literal("add_inv")
    let addFluidCMD = Commands.literal("add_fluid")
    let addEnergyCMD = Commands.literal("add_energy")
    QuestLines.forEach(line => {
        addHandCMD.then(Commands.literal(line).executes(c => addHand(line.toLowerCase(), c.source.player)))
        addInvCMD.then(Commands.literal(line).executes(c => addInv(line.toLowerCase(), c.source.player)))

        addFluidCMD.then(Commands.literal(line)
                .then(Commands.argument("fluidArg", Arguments.STRING.create(event)).executes(c => addFluid(line.toLowerCase(), c.source.player, Arguments.STRING.getResult(c, "fluidArg"), 1000))
                        .then(Commands.argument("fluidAmount", Arguments.INTEGER.create(event)).executes(c => addFluid(line.toLowerCase(), c.source.player, Arguments.STRING.getResult(c, "fluidArg"), Arguments.INTEGER.getResult(c, "fluidAmount"))))))
        
        addEnergyCMD.then(Commands.literal(line)
                .then(Commands.argument("energyAmount", Arguments.INTEGER.create(event))
                .executes(c => addEnergy(line.toLowerCase(), c.source.player, Arguments.INTEGER.getResult(c, "energyAmount")))))
    });

    let dqCMD = Commands.literal('dq')
        .requires(s => s.hasPermission(2))
        .then(addHandCMD)
        .then(addInvCMD)
        .then(addFluidCMD)
        .then(addEnergyCMD)

    event.register(dqCMD);
});

function messagePlayer(player, message) {
    player.server.scheduleInTicks(1, event => {
        player.tell(Text.of(message));
    });
}

function addPool(poolName, task, task_key) {
    const pools = JsonIO.read(poolJsonPath) || {}
    let pool = (pools && poolName in pools) ? pools[poolName] : {}

    let task_key_slug = slugify(task_key)
    if (!(task_key_slug in pool)) {
        pool[task_key_slug] = task
    }
    pools[poolName] = pool
    JsonIO.write(poolJsonPath, pools)
}

function createTask(taskType, taskData){
    return {
        type: taskType,
        data: taskData
    }
}

function addItemTask(pool, itemstack, player){
    if (itemstack.isEmpty()) { return }
    itemstack.setCount(1)

    let jsonStack = itemstack.strongNBT().toJson()
    let compare_string = `${itemstack.getItem()}-${itemstack.serializeNBT().toString()}`

    let itemtask = createTask(TaskTypes.ItemTask.id, itemstack)
    addPool(pool, itemtask, compare_string)
    messagePlayer(player, `Added Item: ${pool}  ${itemstack.getItem()}`)
}

function addHand(pool, player) {
    let itemstack = player.getMainHandItem()
    addItemTask(pool, itemstack, player)
    return 1;
};

function addInv(pool, player) {
    let inventory = player.getInventory()
    inventory.items.forEach(itemstack => { addItemTask(pool, itemstack, player) });
    return 1;
};

function addFluid(pool, player, fluid, amount){
    if(!(fluid && amount)){ return 1}
    let fluidData = {
        name: fluid,
        amount: amount
    }
    let compare_string = `${fluid}-${amount}`
    let fluidtask = createTask(TaskTypes.FluidTask.id, fluidData)
    addPool(pool, fluidtask, compare_string)
    messagePlayer(player, `Added Fluid: ${pool} ${fluid} ${amount}`)
    return 1
}

function addEnergy(pool, player, amount){
    if(!amount){ return 1}
    let energyData = amount
    let compare_string = `${TaskTypes.ForgeEnergyTask.id}-${amount}`
    let energyTask = createTask(TaskTypes.ForgeEnergyTask.id, energyData)
    addPool(pool, energyTask, compare_string)
    messagePlayer(player, `Added Fluid: ${pool} energy ${amount}`)
    return 1
}