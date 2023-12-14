ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: 'rootsclassic:bark_knife'
    })

    event.shaped('rootsclassic:bark_knife', [
        ' SS',
        'SMS',
        'WS '
    ], {
        S: '#minecraft:saplings',
        W: '#forge:rods/wooden',
        M: 'botania:mossy_livingwood_planks'
    })
})