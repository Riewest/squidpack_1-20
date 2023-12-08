ServerEvents.recipes(event => {
    event.remove({
        output:
            [Item.of('create_sa:brass_jetpack_chestplate', '{Damage:0}'),
            Item.of('create_sa:andesite_jetpack_chestplate', '{Damage:0}'),
            Item.of('create_sa:copper_jetpack_chestplate', '{Damage:0}'),
            'create_jetpack:jetpack'
        ]
    })

    // event.remove({ id: "" })
})