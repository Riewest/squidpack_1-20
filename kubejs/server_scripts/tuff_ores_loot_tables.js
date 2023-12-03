ServerEvents.blockLootTables(event => {
    // Do a for loop here over all the ore types from list
    // event.addBlock('kubejs:tuff_coal_ore', table => {
    const tuff_ores = global.tuff_ores_settings
    for (const tuff_ore of tuff_ores) {
        event.addBlock('kubejs:' + tuff_ore.item_name, table => {
            table.addPool(pool => {
                pool.rolls = [global["TUFF_MIN_ORE_PER_BLOCK"], global["TUFF_MAX_ORE_PER_BLOCK"]]
                pool.addItem(tuff_ore.primary_drop, global["TUFF_MAX_ORE_PER_BLOCK"] - 1)
                if ("secondary_drop" in tuff_ore) {
                    pool.addItem(tuff_ore.secondary_drop, 1)
                }
            })

        })
    }
})