ServerEvents.recipes(event => {
    event.remove({
        output: [
            Item.of('botania:flight_tiara', '{variant:0}')
        ]
    })
    event.remove({ id: "botania:pure_daisy/end_stone_to_cobbled_deepslate" })
    event.remove({ id: "botania:pure_daisy/livingwood" })
    event.remove({ id: "botania:pure_daisy/livingrock" })

    event.shaped(Item.of('botania:flight_tiara', '{variant:0}'), [
        'GGG',
        'FEF',
        'DAD'
    ], {
        G: 'botania:gaia_ingot',
        F: Item.of('tombstone:scroll_of_feather_fall', '{enchant:1b}').weakNBT(),
        E: Item.of('minecraft:elytra', '{Damage:0}').enchant('minecraft:mending', 1).enchant('minecraft:unbreaking', 3).weakNBT(),
        D: 'botania:daffomill',
        A: 'botania:ender_air_bottle'
    })


    //Pure Daisy Mods
    event.custom({
        "type": "botania:pure_daisy",
        "input": {
            "type": "block",
            "block": "minecraft:end_stone"
        },
        "output": {
            "name": "botania:livingrock"
        }
    })

    event.custom({
        "type": "botania:pure_daisy",
        "input": {
            "type": "block",
            "block": 'minecraft:crimson_stem'
        },
        "output": {
            "name": 'botania:livingwood_log'
        }
    })

    event.custom({
        "type": "botania:pure_daisy",
        "input": {
            "type": "block",
            "block": 'minecraft:warped_stem'
        },
        "output": {
            "name": 'botania:livingwood_log'
        }
    })
})