ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'sophisticatedstorage:stack_upgrade_tier_4',
            'sophisticatedbackpacks:diamond_backpack',
            'sophisticatedbackpacks:netherite_backpack',
            'sophisticatedbackpacks:iron_backpack',
            'sophisticatedbackpacks:gold_backpack',
            'sophisticatedbackpacks:stack_upgrade_tier_1',
            'sophisticatedbackpacks:stack_upgrade_tier_2',
            'sophisticatedstorage:stack_upgrade_tier_3',
            'sophisticatedstorage:stack_upgrade_tier_2',
            'sophisticatedstorage:stack_upgrade_tier_1',
            'sophisticatedstorage:advanced_compacting_upgrade',
            'sophisticatedbackpacks:stack_upgrade_tier_3',
            'sophisticatedbackpacks:stack_upgrade_tier_4',
            'sophisticatedbackpacks:advanced_compacting_upgrade',
            'sophisticatedbackpacks:inception_upgrade',
            'sophisticatedstorage:packing_tape',
            'sophisticatedstorage:compression_upgrade'
        ]
    })

    event.shaped(Item.of('sophisticatedbackpacks:iron_backpack'), [
        'III',
        'IBI',
        'III'
    ], {
        I: 'minecraft:iron_block',
        B: 'sophisticatedbackpacks:backpack'
    })
})