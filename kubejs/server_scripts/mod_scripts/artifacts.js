LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.ENTITY, LootType.CHEST) // or multiple LootType.BLOCK, LootType.ENTITY ...
        .replaceLoot([
            'artifacts:charm_of_sinking',
            'artifacts:thorn_pendant',
            'artifacts:flame_pendant',
            'artifacts:power_glove',
            'artifacts:digging_claws',
            'artifacts:universal_attractor',
            'artifacts:aqua_dashers',
            'artifacts:kitty_slippers',
            'artifacts:flippers',
            'artifacts:lucky_scarf',
            'artifacts:cross_necklace',
            'artifacts:fire_gauntlet',
            'artifacts:obsidian_skull',
            'artifacts:superstitious_hat',
            'artifacts:scarf_of_invisibility',
            'artifacts:villager_hat',
            'artifacts:night_vision_goggles',
            'artifacts:snorkel',
            'artifacts:bunny_hoppers',
            'artifacts:eternal_steak',
            'artifacts:everlasting_beef',
            'artifacts:crystal_heart'
        ], 'minecraft:emerald')
});

LootJS.modifiers((event) => {
    event
        .addLootTypeModifier([LootType.ENTITY])
        .matchEntity((entity) => {
            entity.anyType("minecraft:warden")
        })
        .randomChance(0.05)
        .addLoot('artifacts:everlasting_beef')
        
});