ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            'shrink:shrinking_device'
        ]
    })
})