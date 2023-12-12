ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [Item.of('wstweaks:lava_blade', '{Damage:0}'), Item.of('wstweaks:blaze_blade', '{Damage:0}')]
    })
})