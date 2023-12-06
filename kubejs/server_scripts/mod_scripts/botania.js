ServerEvents.recipes(event => {
    event.remove({id:"botania:pure_daisy/end_stone_to_cobbled_deepslate"})
    event.remove({id:"botania:pure_daisy/livingwood"})

    //End stone to Living Rock
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