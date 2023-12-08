ServerEvents.recipes(event => {
    //removals
    event.remove({
        output: [
            Item.of('grapplemod:longfallboots', '{Damage:0}'),
            'grapplemod:rocketupgradeitem',
            'grapplemod:swingupgradeitem',
            'grapplemod:staffupgradeitem',
            'grapplemod:motorupgradeitem',
            'grapplemod:magnetupgradeitem',
            'grapplemod:forcefieldupgradeitem',
            'grapplemod:repeller',
            'grapplemod:launcheritem',
            'grapplemod:doubleupgradeitem',
            'grapplemod:limitsupgradeitem',
            'grapplemod:throwupgradeitem'
        ]
    })
})